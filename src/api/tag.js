export const schema = `
  type Tag {
    id: ID!
    title: String!
    description: String!
    textColor: String!
    backgroundColor: String!
    author: User
    confirmationSteps: [[String]]!
    onApplyScript: String!
    webhookUrl: String!
    isAssignable: Boolean!
    isSystem: Boolean!
    contacts(campaignId: String): [CampaignContact]!
  }
  input TagInput {
    id: ID
    title: String!
    description: String!
    textColor: String!
    backgroundColor: String!
    confirmationSteps: [[String]]!
    onApplyScript: String!
    webhookUrl: String!
    isAssignable: Boolean!
  }
  input TagsFilter {
    excludeEscalated: Boolean
    escalatedConvosOnly: Boolean
  }
`;
