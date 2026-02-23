// Codes by mahdi tasha
// Importing part
import { Kbd, KbdGroup } from "@/component/ui/kbd";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/component/ui/empty";
import { EmptyContainerProps } from "@/type/component";

// Creating and exporting EmptyContainer component as default
export default function EmptyContainer({
  icon,
  className,
  createKey = "a",
}: EmptyContainerProps) {
  // Returning JSX
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>{icon}</EmptyMedia>
        <EmptyTitle>Nothing Here Yet</EmptyTitle>
        <EmptyDescription>
          This list is currently empty. Once items are added, they’ll appear
          here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex items-center justify-between gap-3">
          <span className="block text-left truncate text-sm text-foreground font-medium">
            To Create :
          </span>
          <KbdGroup className="shrink-0">
            <Kbd>Ctrl</Kbd>+<Kbd>{createKey}</Kbd>
          </KbdGroup>
        </div>
      </EmptyContent>
    </Empty>
  );
}
