---
title: 'Language Models are Few-Shot Learners (GPT-3)'
description: 'Open AI'
date: '2020-08-29'
categories: ['Paper Review']
published: true
---

### Abstract

> Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic in architecture, this method still requires task-specific fine-tuning datasets of thousands or tens of thousands of examples. By contrast, humans can generally perform a new language task from only a few examples or from simple instructions – something which current NLP systems still largely struggle to do. Here we show that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine- tuning approaches. Specifically, we train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance in the few-shot setting. For all tasks, GPT-3 is applied without any gradient updates or fine-tuning, with tasks and few-shot demonstrations specified purely via text interaction with the model. GPT-3 achieves strong performance on many NLP datasets, including translation, question-answering, and cloze tasks, as well as several tasks that require on-the-fly reasoning or domain adaptation, such as unscrambling words, using a novel word in a sentence, or performing 3-digit arithmetic. At the same time, we also identify some datasets where GPT-3’s few-shot learning still struggles, as well as some datasets where GPT-3 faces methodological issues related to training on large web corpora. Finally, we find that GPT-3 can generate samples of news articles which human evaluators have difficulty distinguishing from articles written by humans. We discuss broader societal impacts of this finding and of GPT-3 in general.

### Overview

Generative Pre-trained Transformer 3 (GPT-3) is an autoregressive language model to introduced in May 2020 by OpenAI. The paper itself mostly discusses the results, and fully understanding GPT requires a fair amount of understanding of NLP. If you have basic familiarity with neural nets, you can learn more about language models / transformers by reading these in order:

- <http://karpathy.github.io/2015/05/21/rnn-effectiveness/>
- <http://colah.github.io/posts/2015-08-Understanding-LSTMs/>
- <https://distill.pub/2016/augmented-rnns/#attentional-interfaces>
- [Attention is All You Need paper](https://arxiv.org/pdf/1706.03762.pdf) — introduces the transformer.
- <http://jalammar.github.io/illustrated-gpt2/>

However, if you're starting from scratch, [fast.ai's MOOC](https://course.fast.ai/) is my goto recommendation. My hightlights from the paper are below.

### Highlights

- Recent years have featured a trend towards pre-trained language representations in NLP systems, applied in increasingly flexible and task-agnostic ways for downstream transfer. First, single-layer representations were learned using word vectors and fed to task-speciﬁc architectures, then RNNs with multiple layers of representations and contextual state were used to form stronger representations (though still applied to task-speciﬁc architectures), and more recently pre-trained recurrent or transformer language models have been directly ﬁne-tuned, entirely removing the need for task-speciﬁc architectures.

- While zero-shot performance improves steadily with model size, few-shot performance increases more rapidly, demonstrating that larger models are more proﬁcient at in-context learning

![Zero-shot, one-shot and few-shot, contrasted with traditional fine-tuning.](./learning-modes.png)

- The authors use the same model and architecture as GPT-2, including the modified initialization, pre-normalization, and reversible tokenization described therein, with the exception that we use alternating dense and locally banded sparse attention patterns in the layers of the transformer, similar to the Sparse Transformer. To study the dependence of ML performance on model size, they train 8 different sizes of model, ranging over three orders of magnitude from 125 million parameters to 175 billion parameters, with the last being the model we call GPT-3. Previous work suggests that with enough training data, scaling of validation loss should be approximately a smooth power law as a function of size; training models of many different sizes allows us to test this hypothesis both for validation loss and for downstream language tasks.

- A major methodological concern with language models pretrained on a broad swath of internet data, particularly large models with the capacity to memorize vast amounts of content, is potential contamination of downstream tasks by having their test or development sets inadvertently seen during pre-training (data-contamination.)

- There appears to be a trend towards chance accuracy with model size, and human detection of GPT-3 is close to chance. This is true despite the fact that participants spend more time on each output as model size increases.

- Automatic detection of these models may be a promising area of future research.

- On the one hand, the dataset and model size are about two orders of magnitude larger than those used for GPT-2, and include a large amount of Common Crawl, creating increased potential for contamination and memorization. On the other hand, precisely due to the large amount of data, even GPT-3 175B does not overﬁt its training set by a signiﬁcant amount, measured relative to a held-out validation set with which it was deduplicated

- In terms of broader impacts, the authors discuss three factors: potential misuse applications, threat actors, and external incentive structures.

  - Broadly, the analysis indicates that internet-trained models have internet-scale biases; models tend to reﬂect stereotypes present in their training data.
  - The authors found females were more often described using appearance oriented words such as ”beautiful” and ”gorgeous” as compared to men who were more often described using adjectives that span a greater spectrum.
  - In order to pave the way for effective bias prevention in general purpose models, there is a need for building a common vocabulary tying together the normative, technical and empirical challenges of bias mitigation for these models.

### PDF

- [Original](https://arxiv.org/pdf/2005.14165.pdf)
- [Annotated copy](./gpt-3-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #21 in this [series](https://anantjain.dev/#paper-reviews).
