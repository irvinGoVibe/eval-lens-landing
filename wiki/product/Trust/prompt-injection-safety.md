# Prompt Injection Safety

## Page purpose

Explain how EvalLense treats hidden or malicious instructions inside pitch decks.

## User task

Help the user trust that uploaded documents cannot manipulate the evaluation logic.

## Main idea to communicate

Pitch deck content is evaluated as content. It cannot override system rules or force the evaluator to change scores.

## Problem

Pitch decks can contain hidden text, embedded instructions, or adversarial content that tries to manipulate AI systems.

## What the page should prove

```text
EvalLense separates document content from evaluation instructions.
Evaluation logic remains controlled by the system, not by the uploaded deck.
```

## Section structure

### 1. Hero

Purpose:

```text
Position prompt injection safety as part of evaluation integrity.
```

Message:

```text
Protect evaluation logic from hidden instructions and adversarial deck content.
```

### 2. What can go wrong

Purpose:

```text
Explain prompt injection in simple terms.
```

Examples:

```text
A deck asks the model to ignore scoring rules
A hidden instruction tells the model to give maximum score
A slide contains text designed to manipulate the evaluator
```

### 3. Evaluation boundary

Purpose:

```text
Explain separation of content and control.
```

Message:

```text
Deck content is evidence to analyze, not instruction to follow.
```

### 4. Safety approach

Purpose:

```text
Explain the product principle without overclaiming.
```

Content:

```text
Controlled evaluation prompts
Document content isolation
Instruction hierarchy
Human review visibility
Suspicious content handling
```

### 5. Why it matters

Purpose:

```text
Connect safety to fairness and trust.
```

Message:

```text
Participants should not be able to influence the evaluation by embedding instructions inside a deck.
```

### 6. Human oversight

Purpose:

```text
Clarify that suspicious or ambiguous cases can be reviewed by humans.
```

Message:

```text
EvalLense supports controlled evaluation and keeps final decisions human-owned.
```

### 7. CTA

Purpose:

```text
Move users to Security & Privacy or demo.
```

CTA:

```text
Explore Security & Privacy
Book a Demo
```
