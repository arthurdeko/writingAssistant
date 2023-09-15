/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPrompt = /* GraphQL */ `
  query GetPrompt($id: ID!) {
    getPrompt(id: $id) {
      id
      name
      text
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPrompts = /* GraphQL */ `
  query ListPrompts(
    $filter: ModelPromptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrompts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        text
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
