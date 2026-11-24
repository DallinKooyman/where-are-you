// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

export class User {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}