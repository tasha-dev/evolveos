// Codes by mahdi tasha
// Importing part
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/component/ui/carousel";
import DashboardImage from "@/image/demo/dashboard.png";
import Dashboard2Image from "@/image/demo/dashboard-2.png";
import JournalImage from "@/image/demo/journal.png";
import TaskImage from "@/image/demo/task.png";
import ProjectImage from "@/image/demo/projects.png";
import HabitsImage from "@/image/demo/habits.png";
import NotesImage from "@/image/demo/note.png";
import ImageMagnifier from "@/component/imageMagnifier";

// Defining data of carousel to render
const data = [
  DashboardImage.src,
  Dashboard2Image.src,
  JournalImage.src,
  TaskImage.src,
  ProjectImage.src,
  HabitsImage.src,
  NotesImage.src,
];

// Creating and exporting Visual Demo section of home page as default
export default function VisualDemo() {
  // Returning JSX
  return (
    <section className="max-w-4xl border-x border-foreground/10 mx-auto border-b">
      <main className="prose dark:prose-invert prose-neutral p-4 max-w-full">
        <h2 className="mt-0">See EvolveOS in Action</h2>
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index}>
                <ImageMagnifier
                  src={item}
                  className="w-full lg:h-[500px] h-[300px] bg-muted rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-4" variant={"darkblur"} />
          <CarouselPrevious className="left-4" variant={"darkblur"} />
        </Carousel>
      </main>
    </section>
  );
}
