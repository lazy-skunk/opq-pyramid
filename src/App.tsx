import OpqAnalysis from "./OpqAnalysis";
import PyramidPrinciple from "./PyramidPrinciple";

function App() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center gap-6 p-6">
      <header>
        <h1 className="text-lg font-bold">
          <a href="#">OPQ Pyramid</a>
        </h1>
      </header>

      <main className="w-full max-w-7xl space-y-4">
        <OpqAnalysis />
        <PyramidPrinciple />
      </main>
    </div>
  );
}

export default App;
