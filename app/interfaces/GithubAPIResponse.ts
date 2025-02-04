export interface GitHubSearchIssuesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Issue[] | undefined | null;
}

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  assignee: User | null;
  milestone: Milestone | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  pull_request?: PullRequest;
  body: string;
  score: number;
  locked: boolean;
  author_association: string;
  state_reason?: string;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
}

interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
  node_id: string;
  id: number;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: User;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
}

interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}
