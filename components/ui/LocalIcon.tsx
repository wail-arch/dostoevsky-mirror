import { cn } from "../../lib/utils/cn";

type IconName = "book" | "brain" | "heart" | "flame" | "eye" | "shield" | "moon" | "sparkles" | "chevron" | "reset" | "share";

type LocalIconProps = {
  name: IconName;
  className?: string;
  title?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </>
  ),
  brain: (
    <>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3.5 3.5 0 0 0 8.5 18H10V4H9Z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5.2A3.5 3.5 0 0 1 15.5 18H14V4h1Z" />
      <path d="M10 9H7.5M14 9h2.5M10 14H8m6 0h2" />
    </>
  ),
  heart: <path d="M20.8 5.6c-1.7-2-4.8-1.7-6.3.2L12 8.8 9.5 5.8c-1.5-1.9-4.6-2.2-6.3-.2-1.9 2.3-1.1 5.5 1 7.4L12 20l7.8-7c2.1-1.9 2.9-5.1 1-7.4Z" />,
  flame: <path d="M12 22c4 0 7-2.8 7-6.7 0-2.7-1.4-4.8-3.1-6.7-.5 2.3-1.7 3.4-3 4.1.4-3.1-.5-5.8-3.2-8.7.2 4.3-4.7 6.3-4.7 11.3C5 19.2 8 22 12 22Z" />,
  eye: (
    <>
      <path d="M2.5 12s3.3-6 9.5-6 9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  shield: <path d="M12 22s7-3.2 7-10V5l-7-3-7 3v7c0 6.8 7 10 7 10Z" />,
  moon: <path d="M21 14.8A8.6 8.6 0 0 1 9.2 3 8.7 8.7 0 1 0 21 14.8Z" />,
  sparkles: (
    <>
      <path d="m12 3 1.3 4.2L17.5 8l-4.2 1.3L12 13.5l-1.3-4.2L6.5 8l4.2-1.3L12 3Z" />
      <path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
      <path d="m5.5 13 .7 1.8L8 15.5l-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  reset: (
    <>
      <path d="M4 4v6h6" />
      <path d="M20 12a8 8 0 0 1-14.6 4.5M4.6 10A8 8 0 0 1 19 7" />
    </>
  ),
  share: (
    <>
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M12 16V3" />
      <path d="m7 8 5-5 5 5" />
    </>
  )
};

export function LocalIcon({ name, className, title }: LocalIconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

