import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastClass } from "@/models/toast-class";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit() {
    form.reset();
    toast(
      ToastClass.create()
        .setTitle("Message sent successfully")
        .setDescription("We will get back to you soon!"),
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex w-full flex-col"
      >
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-[6px]">
                <FormLabel className="text-sm font-medium">Name</FormLabel>
                <FormControl>
                  <Input className="py-6" placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-[6px]">
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input className="py-6" placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-[6px]">
                <FormLabel className="text-sm font-medium">Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-32"
                    placeholder="Your Message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="mt-6 py-6 sm:w-1/3"
        >
          Send message
        </Button>
        <Toaster />
      </form>
    </Form>
  );
};

export default ContactForm;
