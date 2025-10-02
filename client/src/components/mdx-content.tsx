import * as runtime from "react/jsx-runtime";
import { cn } from "@/lib/utils";

const sharedComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <h1
      className={cn(
        "mt-4 scroll-m-20 text-4xl font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <p
      className={cn("leading-6 [&:not(:first-child)]:mt-4", className)}
      {...props}
    />
  ),
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};
