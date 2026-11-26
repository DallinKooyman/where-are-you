// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { getRequest } from "./apiClient";

export const canReachServer = async (serverAddress: string): Promise<boolean> => {
  const response = await getRequest('/status');
  return response.ok;
}