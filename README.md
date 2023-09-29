<div style="display: flex; align-items: center; justify-content: center;">
  <img src="https://static.wixstatic.com/media/cef1ec_991a7546c9964e3487062bb405395c4b~mv2.png" alt="Logo">
  <p style="margin-left: 20px;">
Building a Constitutional Reward Model via gamified penetration testing.
<img src="https://static.wixstatic.com/media/cef1ec_bac6c990ad67420abfe8fd7ca10924bc~mv2.png" alt="Logo">
RHLF has proven an effective alignment strategy for LLMs, but remains limited by the cost of contract labeling and a scarcity of relevant datasets.

Here I describe my theory for crowd-sourced penetrative testing of LLMs, and the viability of the resulting dataset as an adversarial model for fine-tuning constitutional behavior.

Motivation:

- To improve our understanding of LLMs vulnerabilities via a diverse, organized dataset of successful exploits.

- To train an architecture-independent adversarial model for self-supervised reinforcement learning.

- To establish a standard metric for LLM behavior evaluation.

Methodology:

  Provide an infrastructure for the public to post and complete “bounties” by invoking specific behavior in their chosen model
  
  Evaluate user submissions in three steps:
  - Is a chat conversation
  - Is the specified model
  - Is pass/fail

Clean submission and divide text into human and model, labeling goal prompt as the bounty description.

Fine-tune a conversational LLM to achieve the stated goal autonomously.

Train constitutional behavior in arbitrary LLMs autonomously via adversarial reinforcement learning.
</p>
</div>
