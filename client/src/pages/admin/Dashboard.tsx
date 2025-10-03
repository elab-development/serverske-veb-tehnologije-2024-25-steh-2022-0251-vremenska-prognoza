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

  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    // test image
    image:
      "https://www.ydr.com/gcdn/media/2018/02/16/PAGroup/YorkDailyRecord/636543689783396308-weather-news.jpg?crop=1918,1084,x0,y0&width=1918&height=1084&format=pjpg&auto=webp",
  });

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

  const uploadImage = async () => {
    // setIsUploading(true);
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
          {/* Create article dialog */}
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

      {/* List of posts */}
      <div className="mt-10 grid grid-cols-1 gap-4">
        {news.map((post) => (
          <Card
            key={post.id}
            post={post}
            isSelected={selected.includes(post.id)}
            onSelect={() => toggleSelect(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
