---
title: 'Ethereum Whitepaper'
description: 'Vitalik Buterin'
date: '2021-03-27'
categories: ['Paper Review']
published: true
---

### Abstract

> Satoshi Nakamoto's development of Bitcoin in 2009 has often been hailed as a radical development in money and currency, being the first example of a digital asset which simultaneously has no backing or intrinsic value and no centralized issuer or controller. However, another - arguably more important - part of the Bitcoin experiment is the underlying blockchain technology as a tool of distributed consensus, and attention is rapidly starting to shift to this other aspect of Bitcoin. Commonly cited alternative applications of blockchain technology include using on-blockchain digital assets to represent custom currencies and financial instruments (colored coins), the ownership of an underlying physical device (smart property), non-fungible assets such as domain names (Namecoin), as well as more complex applications involving having digital assets being directly controlled by a piece of code implementing arbitrary rules (smart contracts) or even blockchain-based decentralized autonomous organizations (DAOs). What Ethereum intends to provide is a blockchain with a built-in fully fledged Turing-complete programming language that can be used to create "contracts" that can be used to encode arbitrary state transition functions, allowing users to create any of the systems described above, as well as many others that we have not yet imagined, simply by writing up the logic in a few lines of code.

### Highlights
* Page 2: 
    > What Ethereum intends to provide is a blockchain with a built-in fully fledged Turing-complete programming language that can be  used to create "contracts" that can be used to encode arbitrary state transition functions,  allowing users to create any of the systems described above, as well as many others that we  have not yet imagined, simply by writing up the logic in a few lines of code.
* Page 4: 
    > The "state" in Bitcoin is the collection of all coins (technically, "unspent transaction outputs"  or UTXO) that have been mined and not yet spent, with each UTXO having a denomination  and an owner (defined by a 20-byte address which is essentially a cryptographic public key ). A transaction contains one or more inputs, with each input containing a reference to an existing UTXO and a cryptographic signature produced by the private key associated with the  owner's address, and one or more outputs, with each output containing a new UTXO to be  added to the state.
    "state" in Bitcoin.
* Page 6: 
    > The one validity condition present in the above list that is not found in other systems is the  requirement for "proof of work". The precise condition is that the double-SHA256 hash of  every block, treated as a 256-bit number, must be less than a dynamically adjusted target,  which as of the time of this writing is approximately 2  . The purpose of this is to make block  creation computationally "hard", thereby preventing sybil attackers from remaking the entire  blockchain in their favor.
    Validity condition
* Page 6: 
    > Additionally, note that the order in which the miner includes transactions into the block matters; if there are two  transactions A and B in a block such that B spends a UTXO created by A, then the block will  be valid if A comes before B but not otherwise.
* Page 7: 
    > The rule is that in a fork the longest blockchain is taken to be the truth, and so legitimate miners will work on the 275 chain while the attacker alone is working on the  270 chain. In order for the attacker to make his blockchain the longest, he would need to have  more computational power than the rest of the network combined in order to catch up  (hence, "51% attack").
    51% attack
* Page 8: 
    > The Merkle tree protocol is arguably essential to long-term sustainability. A "full node" in the  Bitcoin network, one that stores and processes the entirety of every block, takes up about 15  GB of disk space in the Bitcoin network as of April 2014, and is growing by over a gigabyte  per month. Currently, this is viable for some desktop computers and not phones, and later on  in the future only businesses and hobbyists will be able to participate. A protocol known as  "simplified payment verification" (SPV) allows for another class of nodes to exist, called "light  nodes", which download the block headers, verify the proof of work on the block headers,  and then download only the "branches" associated with transactions that are relevant to  them.
    Simplified Payment Verification
* Page 8: 
    > A Merkle tree is a type of binary tree, composed of a set of nodes with a large number of leaf nodes at the  bottom of the tree containing the underlying data, a set of intermediate nodes where each  node is the hash of its two children, and finally a single root node, also formed from the hash  of its two children, representing the "top" of the tree.
    Merkle tree.
* Page 9: 
    > Because the metacoin protocol cannot prevent invalid metacoin transactions from appearing in the Bitcoin blockchain, a rule is added that if APPLY'(S,TX)  returns an error, the protocol defaults to  APPLY'(S,TX) = S . This provides an easy mechanism for creating an arbitrary cryptocurrency protocol, potentially with advanced features that cannot be implemented inside of Bitcoin itself, but with a very  low development cost since the complexities of mining and networking are already  handled by the Bitcoin protocol
    Metacoin
* Page 10: 
    > Even without any extensions, the Bitcoin protocol actually does facilitate a weak version of a  concept of "smart contracts". UTXO in Bitcoin can be owned not just by a public key, but also  by a more complicated script expressed in a simple stack-based programming language. In  this paradigm, a transaction spending that UTXO must provide data that satisfies the script.
* Page 10: 
    > The Bitcoin-based approach, on the other hand, has the flaw that it does not inherit the  simplified payment verification features of Bitcoin. SPV works for Bitcoin because it can use  blockchain depth as a proxy for validity; at some point, once the ancestors of a transaction go  far enough back, it is safe to say that they were legitimately part of the state. Blockchain based meta-protocols, on the other hand, cannot force the blockchain not to include  transactions that are not valid within the context of their own protocols. Hence, a fully secure  SPV meta-protocol implementation would need to backward scan all the way to the beginning  of the Bitcoin blockchain to determine whether or not certain transactions are valid. Currently,  all "light" implementations of Bitcoin-based meta-protocols rely on a trusted server to  provide the data, arguably a highly suboptimal result especially when one of the primary  purposes of a cryptocurrency is to eliminate the need for trust.
    Why a Bitcoin-based approach for building a new consensus protocol does not work.
* Page 11: 
    > Lack of state - a UTXO can either be spent or unspent ↗ ; there is no opportunity for  multi-stage contracts or scripts which keep any other internal state beyond that.
* Page 12: 
    > Thus, we see three approaches to building advanced applications on top of cryptocurrency:  building a new blockchain, using scripting on top of Bitcoin, and building a meta-protocol on  top of Bitcoin. Building a new blockchain allows for unlimited freedom in building a feature  set, but at the cost of development time, bootstrapping effort and security. Using scripting is  easy to implement and standardize, but is very limited in its capabilities, and meta-protocols,  while easy, suffer from faults in scalability.
    Why Ethereum was created.
* Page 12: 
    > A bare-bones version of Namecoin can be written in two lines of code, and other protocols like currencies and reputation systems can be built in  under twenty.
* Page 13: 
    > A programmer can even run an infinite loop script on top of Ethereum for as long as they are willing to keep paying the per-computational-step  transaction fee.
* Page 14: 
    > "Ether" is the main internal crypto-fuel of Ethereum, and is used to pay transaction fees. In  general, there are two types of accounts: externally owned accounts, controlled by private  keys, and contract accounts, controlled by their contract code.
    Two types of accounts
* Page 14: 
    > In Ethereum, the state is made up of objects called "accounts", with each account having a  20-byte address and state transitions being direct transfers of value and information between  accounts. An Ethereum account contains four fields:  The nonce, a counter used to make sure each transaction can only be processed once  The account's current ether balance  The account's contract code, if present  The account's storage (empty by default)
    Ethereum state
* Page 15: 
    > Contracts have the ability to send "messages" to other contracts. Messages are virtual  objects that are never serialized and exist only in the Ethereum execution environment.
    Messages
* Page 15: 
    > The  STARTGAS  and  GASPRICE  fields are crucial for Ethereum's anti-denial of service model. In order to prevent accidental or hostile infinite loops or other computational wastage in code, each transaction is required to set a limit to how many computational steps of code  execution it can use.
    Gas
* Page 18: 
    > The operations have access to three types of space in which to store data: The stack, a last-in-first-out container to which values can be pushed and popped  Memory, an infinitely expandable byte array  The contract's long-term storage, a key/value store. Unlike stack and memory, which  reset after computation ends, storage persists for the long term.
* Page 18: 
    > Finally, note that there is an opcode,  CREATE , that creates a contract; its execution mechanics are generally similar to  CALL , with the exception that the output of the execution determines the code of a newly created contract.
    CREATE and CALL
* Page 18: 
    > While the Ethereum virtual machine is running, its full computational state can be defined by the tuple  (block_state, transaction, message, code, memory, stack, pc, gas) , where  block_state is the global state containing all accounts and includes balances and storage.
    EVM state
* Page 19: 
    > The main difference between Ethereum and Bitcoin with regard to the blockchain architecture is that, unlike Bitcoin(which only contains a copy of the transaction  list), Ethereum blocks contain a copy of both the transaction list and the most recent state.  Aside from that, two other values, the block number and the difficulty, are also stored in the  block.
    Ethereum vs. Bitcoin
* Page 20: 
    > The first category is financial applications, providing users with more powerful ways of managing and entering into  contracts using their money. This includes sub-currencies, financial derivatives, hedging  contracts, savings wallets, wills, and ultimately even some classes of full-scale employment  contracts. The second category is semi-financial applications, where money is involved but  there is also a heavy non-monetary side to what is being done; a perfect example is self enforcing bounties for solutions to computational problems. Finally, there are applications  such as online voting and decentralized governance that are not financial at all.
    Three categories of applications
* Page 20: 
    > The approach may seem highly inefficient at first glance, because it needs to store the entire  state with each block, but in reality efficiency should be comparable to that of Bitcoin. The  reason is that the state is stored in the tree structure, and after every block only a small part  of the tree needs to be changed. Thus, in general, between two adjacent blocks the vast  majority of the tree should be the same, and therefore the data can be stored once and  referenced twice using pointers (ie. hashes of subtrees). A special kind of tree known as a  "Patricia tree" is used to accomplish this, including a modification to the Merkle tree concept  that allows for nodes to be inserted and deleted, and not just changed, efficiently.
    Good topic for discussion
* Page 22: 
    > Such a contract would have significant potential in crypto-commerce. One of the main  problems cited about cryptocurrency is the fact that it's volatile; although many users and  merchants may want the security and convenience of dealing with cryptographic assets, they  may not wish to face that prospect of losing 23% of the value of their funds in a single day.
    Stablecoins
* Page 24: 
    > The simplest design is simply a piece of self-modifying code that changes if two thirds of members agree on a change. Although code  is theoretically immutable, one can easily get around this and have de-facto mutability by  having chunks of the code in separate contracts, and having the address of which contracts  to call stored in the modifiable storage
    DAO design
* Page 24: 
    > An important feature of the protocol is that, although it may seem like one is trusting many  random nodes not to decide to forget the file, one can reduce that risk down to near-zero by  splitting the file into many pieces via secret sharing, and watching the contracts to see each  piece is still in some node's possession. If a contract is still paying out money, that provides a  cryptographic proof that someone out there is still storing the file.
* Page 26: 
    > For financial contracts for difference, it may actually be possible to decentralize the data feed via a protocol called SchellingCoin ↗ . SchellingCoin  basically works as follows: N parties all put into the system the value of a given datum (eg.  the ETH/USD price), the values are sorted, and everyone between the 25th and 75th  percentile gets one token as a reward.
    ShellingCoin
* Page 28: 
    > GHOST solves the first issue of network security loss by including stale blocks in the calculation of which chain is the "longest"; that is to say,  not just the parent and further ancestors of a block, but also the stale descendants of the  block's ancestor (in Ethereum jargon, "uncles") are added to the calculation of which block  has the largest total proof of work backing it. To solve the second issue of centralization bias,  we go beyond the protocol described by Sompolinsky and Zohar, and also provide block  rewards to stales: a stale block receives 87.5% of its base reward, and the nephew that  includes the stale block receives the remaining 12.5%. Transaction fees, however, are not  awarded to uncles.
    GHOST
* Page 29: 
    > The problem with this line of reasoning is, however, that transaction processing is not a market; although it is intuitively attractive to construe  transaction processing as a service that the miner is offering to the sender, in reality every  transaction that a miner includes will need to be processed by every node in the network, so  the vast majority of the cost of transaction processing is borne by third parties and not the  miner that is making the decision of whether or not to include it. Hence, tragedy-of-the commons problems are very likely to occur.
    Argument against "market-based" fees for txn processing.
* Page 30: 
    > First, there is a  JUMP  instruction that allows the program to jump back to a previous spot in the code, and a  JUMPI  instruction to do conditional jumping, allowing for statements like  while x < 27: x = x * Page 2 . Second, contracts can call other contracts, potentially allowing for looping through recursion.
    Looping in Ethereum
* Page 30: 
    > (3) and (4) are the major issue; to solve them we simply institute a floating cap: no block can have more operations than  BLK_LIMIT_FACTOR  times the long-term exponential moving average.
    Solution to 3 and 4.
* Page 31: 
    > Additionally, Turing-incompleteness is not even that big a limitation; out of all the contract examples we have conceived internally, so far only one
    Arguments against Turing-completeness.
* Page 31: 
    > However, the attacker will be required to submit a value for  STARTGAS limiting the number of computational steps that execution can take, so the miner will know ahead of time that the computation will take an excessively large number of steps.
* Page 31: 
    > The contract author does not need to worry about protecting against such attacks, because if execution stops halfway through  the changes they get reverted.
    Important!
* Page 32: 
    > Thus, in 51 transactions, we have a contract that takes up 2 computational steps. Miners could try to detect such logic bombs ahead of time by  maintaining a value alongside each contract specifying the maximum number of  computational steps that it can take, and calculating this for contracts calling other contracts  recursively, but that would require miners to forbid contracts that create other contracts  (since the creation and execution of all 26 contracts above could easily be rolled into a single  contract).
    Logic bombs
* Page 33: 
    > This should be taken as an expanded version of the concept of "dollars" and "cents" or "BTC"  and "satoshi". In the near future, we expect "ether" to be used for ordinary transactions,  "finney" for microtransactions and "szabo" and "wei" for technical discussions around fees  and protocol implementation; the remaining denominations may become useful later and  should not be included in clients at this point.
* Page 35: 
    > In the event that the Ethereum organization loses funding or for any other reason disappears,  we leave open a "social contract": anyone has the right to create a future candidate version of  Ethereum, with the only condition being that the quantity of ether must be at most equal to 60102216 * Page (1.198 + 0.26 * Page n)  where  n  is the number of years after the genesis block.
    Interesting
* Page 36: 
    > However, one notably interesting feature of this algorithm is that it allows anyone to "poison the well", by introducing  a large number of contracts into the blockchain specifically designed to stymie certain ASICs.
    
### PDF

- [Original](https://ethereum.org/en/whitepaper/)
- [Annotated copy](/assets/blog/ethereum-whitepaper/ethereum-whitepaper-annotated.pdf)

---

I love reading foundational papers in Computer Science and publish my notes here on this blog. This was post #35 in this [series](https://anantjain.dev/#paper-reviews).
