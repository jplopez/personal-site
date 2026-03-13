/**
 * Career achievements content file.
 * Add, edit, or remove achievements here without touching Career.js.
 *
 * Each key must match the `name` field in getCareersList() inside Career.js.
 * Each achievement has:
 *   type    – "text" | "stat" | "badge" | "link"
 *   title   – Headline shown on the card
 *   body    – (text) Supporting paragraph
 *   value   – (stat) Big metric number / percentage
 *   label   – (stat) Description of the metric
 *   text    – (badge) Short pill label
 *   url     – (link) Destination href
 */

export const achievements = {

  "Ameba Games Studio": [
    {
      type: "text",
      title: "Founded an indie game studio",
      body: "Founded Ameba Games Studio to create memorable, craft driven experiences unconstrained by genre or platform",
    },
    {
      type: "stat",
      value: "3",
      label: "Mini-Games shipped in first 6 months",
    },
    {
      type: 'text',
      title: 'AmebaCore Asset',
      body: 'A reusable Unity compatible C# engine layer with clean separation between engine and game logic, incorporating design patterns, deterministic pipelines, and a modular movement and combat system capable of compiling independently of Unity.'
    },
    {
      type: 'text',
      title: 'GMTK 2025 Participation',
      body: 'Earned top 25% art and top 30% creativity rankings in the GMTK 2025 Game Jam (9,583 entries). Applied engineering discipline to game development such as TDD, documentation, tagged releases, and rigorous version control'
    },
    {
      type: "badge",
      text: "Indie Dev · Pico-8 · Unity · System Design · Game Design · Game Development",
    },
  ],

  "Amazon Music": [
    {
      type: "text",
      title: "Engineering Excellence",
      body: "Directed Amazon Music’s multi year engineering excellence program, optimizing AWS infrastructure across streaming, encoding/decoding, storage, and search. Built the org wide roadmap and raised annual savings targets from $6M to $14M and then $20M, shifting leadership from budget cuts to a system specific hardware efficiency model adopted by Finance and Music executives.",
    },
    {
      type: "text",
      title: "Storage Optimization",
      body: "Partnered with principal engineers on migration and optimization strategies, co authored development and troubleshooting docs, and led the cross team triage process that accelerated delivery and unblocked teams. Expanded participation from 6 to 15 groups and built a developer community sharing optimization techniques and best practices.",
    },
    {
      type: "text",
      title: "Infrastructure Cost Savings",
      body: "Enabled major innovation through the new efficiency framework, including a principal engineer proposal for a 40% storage cost reduction. Reduced infrastructure spends from $300K to $20M while improving performance, reliability, and engineering engagement across the organization.",
    },
    {
      type: "text",
      title: "Scaling Readiness",
      body: "Transformed Amazon Music’s scaling readiness for Prime Day and end of year surges by overhauling and automating load testing, data generation, and OKR frameworks. Cut validation time by 25%, expanded system coverage by 50%, and delivered zero scaling incidents from 2022–2024",
    },
    {
      type: "badge",
      text: "SLO · Scalability · Reliability · Observability · Performance Optimization",
    },
  ],

  "Amazon Advertising": [
    {
      type: "text",
      title: "Migration to Distributed Service Oriented Architecture",
      body: "Led multi year transition from monolithic architecture to SOA, building the migration roadmap and serving as the single point of alignment for 20+ engineering teams across the organization. Directed risk management, status reporting, and executive communications while partnering with senior engineers to evaluate technical approaches and justify the chosen migration strategy.",
    },
    {
      type: "text",
      title: "Technical Documentation and Process Creation",
      body: "Co-authored development and troubleshooting documentation, established and led the cross team triage process, and owned escalations and broad communications to keep teams unblocked and accountable. These mechanisms accelerated delivery beyond initial expectations, enabling expansion of the migration scope from 8 to 20 applications.",
    },
    {
      type: "text",
      title: "Telemetry and UI modernization",
      body: "Drove adoption of new telemetry systems by streamlining intake workflows with partner teams and led the deprecation of legacy UI libraries in favor of a unified React based component system. These efforts enabled 100% system coverage within one year, standardized user experience across the Ads Console, and significantly improved platform scalability and feature velocity.",
    },
    {
      type: "badge",
      text: "Ad Tech · SOA · Distributed Systems · Cross-Functional Leadership · Technical Mentorship",
    },
  ],

};


export const achievements_es = {


  "Ameba Games Studio": [
    {
      type: "text",
      title: "Founded an indie game studio",
      body: "Founded Ameba Games Studio to create memorable, craft driven experiences unconstrained by genre or platform",
    },
    {
      type: "stat",
      value: "3",
      label: "Mini-Games shipped in first 6 months",
    },
    {
      type: 'text',
      title: 'AmebaCore Asset',
      body: 'A reusable Unity compatible C# engine layer with clean separation between engine and game logic, incorporating design patterns, deterministic pipelines, and a modular movement and combat system capable of compiling independently of Unity.'
    },
    {
      type: 'text',
      title: 'GMTK 2025 Participation',
      body: 'Earned top 25% art and top 30% creativity rankings in the GMTK 2025 Game Jam (9,583 entries). Applied engineering discipline to game development such as TDD, documentation, tagged releases, and rigorous version control'
    },
    {
      type: "badge",
      text: "Indie Dev · Pico-8 · Unity · System Design · Game Design · Game Development",
    },
  ],

  "Amazon Music": [
    {
      type: "text",
      title: "Engineering Excellence",
      body: "Directed Amazon Music’s multi year engineering excellence program, optimizing AWS infrastructure across streaming, encoding/decoding, storage, and search. Built the org wide roadmap and raised annual savings targets from $6M to $14M and then $20M, shifting leadership from budget cuts to a system specific hardware efficiency model adopted by Finance and Music executives.",
    },
    {
      type: "text",
      title: "Storage Optimization",
      body: "Partnered with principal engineers on migration and optimization strategies, co authored development and troubleshooting docs, and led the cross team triage process that accelerated delivery and unblocked teams. Expanded participation from 6 to 15 groups and built a developer community sharing optimization techniques and best practices.",
    },
    {
      type: "text",
      title: "Infrastructure Cost Savings",
      body: "Enabled major innovation through the new efficiency framework, including a principal engineer proposal for a 40% storage cost reduction. Reduced infrastructure spends from $300K to $20M while improving performance, reliability, and engineering engagement across the organization.",
    },
    {
      type: "text",
      title: "Scaling Readiness",
      body: "Transformed Amazon Music’s scaling readiness for Prime Day and end of year surges by overhauling and automating load testing, data generation, and OKR frameworks. Cut validation time by 25%, expanded system coverage by 50%, and delivered zero scaling incidents from 2022–2024",
    },
    {
      type: "badge",
      text: "SLO · Scalability · Reliability · Observability · Performance Optimization",
    },
  ],

  "Amazon Advertising": [
    {
      type: "text",
      title: "Migration to Distributed Service Oriented Architecture",
      body: "Led multi year transition from monolithic architecture to SOA, building the migration roadmap and serving as the single point of alignment for 20+ engineering teams across the organization. Directed risk management, status reporting, and executive communications while partnering with senior engineers to evaluate technical approaches and justify the chosen migration strategy.",
    },
    {
      type: "text",
      title: "Technical Documentation and Process Creation",
      body: "Co-authored development and troubleshooting documentation, established and led the cross team triage process, and owned escalations and broad communications to keep teams unblocked and accountable. These mechanisms accelerated delivery beyond initial expectations, enabling expansion of the migration scope from 8 to 20 applications.",
    },
    {
      type: "text",
      title: "Telemetry and UI modernization",
      body: "Drove adoption of new telemetry systems by streamlining intake workflows with partner teams and led the deprecation of legacy UI libraries in favor of a unified React based component system. These efforts enabled 100% system coverage within one year, standardized user experience across the Ads Console, and significantly improved platform scalability and feature velocity.",
    },
    {
      type: "badge",
      text: "Ad Tech · SOA · Distributed Systems · Cross-Functional Leadership · Technical Mentorship",
    },
  ],

};
