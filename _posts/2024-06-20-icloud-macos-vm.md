---
layout: post
title:  "You can finally use iCloud with macOS virtual machines"
date:   2024-06-20 12:51
categories: [Links]
tags: [macOS]
link: https://developer.apple.com/documentation/virtualization/using_icloud_with_macos_virtual_machines
---

From Apple’s developer documentation:

>In macOS 15 and later, Virtualization supports access to iCloud accounts and resources when running macOS in a virtual machine (VM) on Apple silicon. When you create a VM in macOS 15 from a macOS 15 software image (an .ipsw file) using a [VZMacHardwareModel](https://developer.apple.com/documentation/virtualization/vzmachardwaremodel) that you obtain from a [VZMacOSRestoreImage](https://developer.apple.com/documentation/virtualization/vzmacosrestoreimage), Virtualization configures an identity for the VM that it derives from security information in the host’s Secure Enclave. Just as individual physical devices have distinct identities based on their Secure Enclaves, this identity is distinct from other VMs.

It’s unfortunate this will only work moving forward starting with macOS 15 Sequoia, but still really great to see.
