import { Shell } from "@/components/shell/Shell";

export default function LayoutApp({ children }: LayoutProps<"/">) {
  return <Shell>{children}</Shell>;
}
