import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuth";
import { News } from "@/lib/types";
import { PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import NewsDialog from "./NewsDialog";

const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [news, setNews] = useState<News[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    image: "",
  });
  const [editingPost, setEditingPost] = useState<News | null>(null);

  const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
  });

  useEffect(() => {
    fetchList();
  }, []);

  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleCancel = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setEditingPost(null);
    setForm({ title: "", subtitle: "", content: "", image: "" });
  };

  const isFormValid =
    form.title.trim() &&
    form.subtitle.trim() &&
    form.content.trim() &&
    form.image.trim();

  // Fetch news list
  const fetchList = async (page = 1) => {
    try {
      const { data } = await api.get(`/api/news?page=${page}&limit=5`);
      setNews(data.items || []);
    } catch (err) {
      console.error(err);
      setNews([]);
    }
  };

  // Create news
  const handleCreate = async () => {
    try {
      if (!isFormValid) return;
      const payload = { ...form, authorId: user?.id ?? "system" };
      const { data: created } = await api.post("/api/news", payload);
      setNews((s) => [created, ...s]);
      await fetchList();
      handleCancel();
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async (files: FileList) => {
    if (!files[0]) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      if (data.secure_url)
        setForm((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Start editing a post
  const startEdit = (post: News) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      subtitle: post.subtitle ?? "",
      content: post.content ?? "",
      image: post.image ?? "",
    });
    setIsEditOpen(true);
  };

  // Update news
  const handleUpdate = async () => {
    try {
      if (!isFormValid || !editingPost) return;
      const payload = { ...form };
      const { data: updated } = await api.put(
        `/api/news/${editingPost.id}`,
        payload,
      );
      setNews((prev) =>
        prev.map((post) => (post.id === updated.id ? updated : post)),
      );
      await fetchList();
      handleCancel();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  return (
    <div className="container mx-auto mb-20 mt-40 overflow-y-auto">
      <div className="flex w-full items-end justify-between border-b pb-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage news efficiently with a streamlined dashboard.
          </p>
        </div>

        <div className="flex gap-2">
          {/* Create Dialog */}
          <NewsDialog
            isOpen={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            form={form}
            setForm={setForm}
            isUploading={isUploading}
            onUpload={uploadImage}
            onSubmit={handleCreate}
            dialogTitle="Add News Article"
            dialogDescription="Fill out the fields below to create a news article."
            submitButtonText="Create"
            triggerButton={
              <Button>
                New Article <PlusIcon className="ml-1" />
              </Button>
            }
          />
        </div>
      </div>

      {/* Edit article dialog */}
      <NewsDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        form={form}
        setForm={setForm}
        isUploading={isUploading}
        onUpload={uploadImage}
        onSubmit={handleUpdate}
        dialogTitle="Edit News Article"
        dialogDescription="Update the fields below and save changes."
        submitButtonText="Save Changes"
      />

      {/* List of posts */}
      <div className="mt-10 grid grid-cols-1 gap-4">
        {news.map((post) => (
          <Card
            key={post.id}
            post={post}
            isSelected={selected.includes(post.id)}
            onSelect={() => toggleSelect(post.id)}
            onEdit={startEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
