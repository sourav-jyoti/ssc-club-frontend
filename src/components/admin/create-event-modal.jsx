"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, Loader2 } from "lucide-react";
import axios from "axios";

const categories = [
  "CONFERENCE",
  "WORKSHOP",
  "MEETUP",
  "SEMINAR",
  "CONCERT",
  "SPORTS",
  "TECH",
  "OTHER",
];

export function CreateEventModal({ isOpen, onClose, onEventCreated }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    venue: "",
    registration: false,
    tags: "",
    poster: null,
    gallery: [],
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleFileChange = (field, files) => {
    if (field === "poster") {
      setFormData((prev) => ({ ...prev, poster: files[0] }));
    } else if (field === "gallery") {
      setFormData((prev) => ({ ...prev, gallery: Array.from(files) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if user is authenticated
      if (!session?.user?.backendToken) {
        setError("You must be logged in to create an event");
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();

      // Add text fields
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("startDate", formData.startDate);
      submitData.append("endDate", formData.endDate);
      submitData.append("venue", formData.venue);
      submitData.append("registration", formData.registration.toString());

      // Add tags as comma-separated string
      if (formData.tags) {
        submitData.append("tags", formData.tags);
      }

      // Add poster file
      if (formData.poster) {
        submitData.append("poster", formData.poster);
      }

      // Add gallery files
      if (formData.gallery.length > 0) {
        formData.gallery.forEach((file) => {
          submitData.append("gallery", file);
        });
      }

      const response = await axios.post(
        `${process.env.BACKEND_API_URL}/event`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session.user.backendToken}`,
          },
        },
      );

      // Call the callback with the new event
      if (onEventCreated) {
        onEventCreated(response.data);
      }

      // Reset form and close modal
      setFormData({
        title: "",
        description: "",
        category: "",
        startDate: "",
        endDate: "",
        venue: "",
        registration: false,
        tags: "",
        poster: null,
        gallery: [],
      });
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create event. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Poster Upload */}
          <div className="space-y-2">
            <Label
              htmlFor="poster"
              className="text-sm font-medium text-gray-700"
            >
              Event Poster
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="poster"
                accept="image/*"
                onChange={(e) => handleFileChange("poster", e.target.files)}
                className="hidden"
              />
              <label htmlFor="poster" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.poster
                    ? formData.poster.name
                    : "Click to upload poster image"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Gallery Upload */}
          <div className="space-y-2">
            <Label
              htmlFor="gallery"
              className="text-sm font-medium text-gray-700"
            >
              Gallery Images (Multiple)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="gallery"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange("gallery", e.target.files)}
                className="hidden"
              />
              <label htmlFor="gallery" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.gallery.length > 0
                    ? `${formData.gallery.length} file(s) selected`
                    : "Click to upload gallery images"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Select multiple images
                </p>
              </label>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Event Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g. Annual Tech Conference 2026"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              className="bg-white border-gray-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              rows={4}
              className="bg-white border-gray-300 resize-none"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
              required
            >
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700"
              >
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                required
                className="bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                End Date *
              </Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
                className="bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-2">
            <Label
              htmlFor="venue"
              className="text-sm font-medium text-gray-700"
            >
              Venue *
            </Label>
            <Input
              id="venue"
              placeholder="e.g. Convention Center, Hall A"
              value={formData.venue}
              onChange={(e) => handleInputChange("venue", e.target.value)}
              required
              className="bg-white border-gray-300"
            />
          </div>

          {/* Registration */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="registration"
              checked={formData.registration}
              onChange={(e) =>
                handleInputChange("registration", e.target.checked)
              }
              className="w-4 h-4 text-blue-500 rounded"
            />
            <Label
              htmlFor="registration"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Enable Registration
            </Label>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              placeholder="e.g. technology, networking, innovation"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Event"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
