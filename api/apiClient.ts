// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { settingsStore } from "@/context/settingsStore";


export function getRequest(path: string): Promise<Response> {
  return apiRequest(path, {
    method: 'GET',
  })
}

export function postRequest(path: string, body: any): Promise<Response> {
  return apiRequest(path, {
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export function putRequest(path: string, body: any): Promise<Response> {
  return apiRequest(path, {
    method: 'PUT',
    body: JSON.stringify(body)
  })
}

export function deleteRequest(path: string): Promise<Response> {
  return apiRequest(path, {
    method: 'DELETE',
  })
}

// Generic call to server. This includes the server address as to not repeat the call in multiple files
// This call should NOT await the fetch response. Each API can determine to await or not await
function apiRequest(route: string, request: RequestInit): Promise<Response> {
  const { serverAddress } = settingsStore.getState();
  return fetch(serverAddress + route, request);
}