import { useState } from "react";

import TextField from "./TextField";

export default function OpqAnalysis() {
  const [audience, setAudience] = useState("");
  const [objective, setObjective] = useState("");
  const [problem, setProblem] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <section aria-labelledby="opq-heading" className="bg-foreground/3 space-y-4 rounded p-4">
      <h2 id="opq-heading" className="font-semibold">
        OPQ Analysis
      </h2>
      <div className="space-y-4">
        <TextField
          label="Audience"
          multiline={false}
          hint="Who is this for?"
          value={audience}
          onChange={setAudience}
        />
        <TextField
          label="Objective"
          multiline={false}
          hint="Your audience's goal."
          value={objective}
          onChange={setObjective}
        />
        <TextField
          label="Problem"
          multiline={false}
          hint="The gap between the goal and reality."
          value={problem}
          onChange={setProblem}
        />
        <TextField
          label="Question"
          multiline={false}
          hint="Your audience's question."
          value={question}
          onChange={setQuestion}
        />
      </div>
    </section>
  );
}
