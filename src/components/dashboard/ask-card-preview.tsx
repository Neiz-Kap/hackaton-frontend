import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AskCardPreview({ onStart }: { onStart: () => void }) {
  return (
    //  className="w-96 h-100% m-8 rounded-md border border-gray-900 items-center"
    <Card className="w-full">
      <CardHeader className="flex-col">
        <div className="flex justify-center">
          <img
            src="https://em-content.zobj.net/source/telegram/386/pensive-face_1f614.webp"
            alt=""
            className="w-16 h-16"
          />
        </div>
        <div className="flex justify-center flex-col gap-2">
          <CardTitle>У вас был тяжёлый звонок ?</CardTitle>
          <CardDescription>Давайте пройдём небольшой опрос.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-50% items-center"></div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="grow" onClick={onStart}>
          Пройти
        </Button>
      </CardFooter>
    </Card>
  );
}