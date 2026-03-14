export type DiagramEntry = {
	id: string;
	title: string;
	description: string;
	code: string;
};

export type DiagramCategory = {
	id: string;
	label: string;
	description: string;
	accent: string;
	diagrams: DiagramEntry[];
};

export const diagramCategories: DiagramCategory[] = [
	{
		id: "flowcharts",
		label: "Flowcharts",
		description: "Decision maps, routing logic, and operational flows.",
		accent: "stone",
		diagrams: [
			{
				id: "launch-pipeline",
				title: "Launch Pipeline",
				description: "A product launch moving from concept to public release.",
				code: `flowchart LR
    A[Idea Brief] --> B{Needs review?}
    B -->|Yes| C[Design Crit]
    B -->|No| D[Prototype]
    C --> D
    D --> E[User Testing]
    E --> F{Signal strong?}
    F -->|Yes| G[Marketing Site]
    F -->|No| H[Iterate]
    H --> D
    G --> I[Release]`
			},
			{
				id: "support-escalation",
				title: "Support Escalation",
				description: "A service desk model with quick triage and engineering fallback.",
				code: `flowchart TD
    A[New Ticket] --> B[Classify Issue]
    B --> C{Severity}
    C -->|Low| D[Self-serve Reply]
    C -->|Medium| E[Support Specialist]
    C -->|High| F[Incident Channel]
    E --> G{Resolved?}
    G -->|Yes| H[Close Ticket]
    G -->|No| I[Engineering Escalation]
    F --> I
    I --> H`
			}
		]
	},
	{
		id: "sequence",
		label: "Sequence",
		description: "Conversations between services, users, and systems.",
		accent: "sage",
		diagrams: [
			{
				id: "deploy-approval",
				title: "Deploy Approval",
				description: "A release flow with checks, approvals, and deployment status updates.",
				code: `sequenceDiagram
    autonumber
    participant PM as Product
    participant CI as CI
    participant QA as QA
    participant Ops as Platform
    PM->>CI: Create release candidate
    CI->>CI: Run test suite
    CI-->>QA: Preview build
    QA->>QA: Verify regressions
    QA-->>Ops: Approve rollout
    Ops->>Ops: Deploy to production
    Ops-->>PM: Release complete`
			},
			{
				id: "checkout-journey",
				title: "Checkout Handshake",
				description: "A storefront checkout that calls payments and fulfillment.",
				code: `sequenceDiagram
    participant Shopper
    participant Storefront
    participant Payments
    participant Warehouse
    Shopper->>Storefront: Submit order
    Storefront->>Payments: Authorize charge
    Payments-->>Storefront: Payment confirmed
    Storefront->>Warehouse: Reserve inventory
    Warehouse-->>Storefront: Allocation ready
    Storefront-->>Shopper: Order confirmed`
			}
		]
	},
	{
		id: "state",
		label: "State",
		description: "Lifecycle transitions for products, sessions, and workflows.",
		accent: "amber",
		diagrams: [
			{
				id: "editor-session",
				title: "Editor Session",
				description: "A drafting workflow from first keystroke to publish.",
				code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Drafting: open file
    Drafting --> Autosaving: pause typing
    Autosaving --> Drafting: continue editing
    Drafting --> Reviewing: request feedback
    Reviewing --> Drafting: revisions requested
    Reviewing --> Published: approved
    Published --> Archived: retired
    Archived --> [*]`
			},
			{
				id: "billing-status",
				title: "Billing Status",
				description: "Subscription billing states with recovery and cancellation paths.",
				code: `stateDiagram-v2
    [*] --> Trial
    Trial --> Active: first payment
    Active --> Grace: payment failed
    Grace --> Active: card updated
    Grace --> Suspended: timeout reached
    Suspended --> Active: invoice paid
    Active --> Canceled: user request
    Suspended --> Canceled: account closed
    Canceled --> [*]`
			}
		]
	},
	{
		id: "data",
		label: "Data Models",
		description: "Entity relationships and system structure.",
		accent: "teal",
		diagrams: [
			{
				id: "commerce-er",
				title: "Commerce ERD",
				description: "Core records for orders, customers, and catalog items.",
				code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : appears_in
    CUSTOMER {
      string id
      string email
      string segment
    }
    ORDER {
      string id
      date created_at
      string status
    }
    PRODUCT {
      string sku
      string title
      float price
    }`
			},
			{
				id: "api-class",
				title: "API Client Classes",
				description: "A compact class view for an API client and its resource models.",
				code: `classDiagram
    class ApiClient {
      +getProjects()
      +createProject(data)
      +archiveProject(id)
    }
    class Project {
      +string id
      +string name
      +string status
    }
    class Member {
      +string id
      +string role
    }
    ApiClient --> Project
    Project "1" --> "*" Member`
			}
		]
	},
	{
		id: "planning",
		label: "Planning",
		description: "Roadmaps, timelines, and user-experience narratives.",
		accent: "rose",
		diagrams: [
			{
				id: "release-gantt",
				title: "Release Gantt",
				description: "A six-week product release with overlapping design and QA work.",
				code: `gantt
    title Release Train
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d
    section Discovery
    Shape scope         :done, d1, 2026-03-03, 5d
    section Design
    UI exploration      :active, d2, after d1, 6d
    section Build
    Core implementation :d3, after d2, 8d
    section Verify
    QA + polish         :d4, after d3, 5d`
			},
			{
				id: "onboarding-journey",
				title: "Onboarding Journey",
				description: "How a new user feels from signup through habit formation.",
				code: `journey
    title First Week Experience
    section Day 1
      Discover the product: 5: User
      Create workspace: 4: User
    section Day 2
      Invite teammates: 3: User, Team
      Configure first workflow: 4: User
    section Day 5
      See first result: 5: User
      Return voluntarily: 4: User`
			}
		]
	}
];
