// Codes by mahdi tasha
// Importing part
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/component/ui/carousel";

// Defining data of carousel to render
const data: string[] = [...new Array(10)].fill("<IMAGE_SRC>"); // TODO: Chane with src of images

// Creating and exporting Visual Demo section of home page as default
export default function VisualDemo() {
  // Returning JSX
  return (
    <section className="max-w-4xl border-x border-foreground/10 mx-auto border-b">
      <main className="prose dark:prose-invert prose-neutral p-4 max-w-full">
        <h2 className="mt-0">See EvolveOS in Action</h2>
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {data.map((_, index) => (
              <CarouselItem key={index}>
                <div className="w-full h-[300px] bg-muted rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-4 backdrop-blur-3xl" />
          <CarouselPrevious className="left-4 backdrop-blur-3xl" />
        </Carousel>
      </main>
    </section>
  );
}
