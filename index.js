import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function removeCodeBlockMarkers(content) {
  return content.replace(/^```[\w]*\s*|```$/g, "").trim();
}

async function extractquestionid(slug) {
  let questionId;
  const response = await fetch("https://leetcode.com/graphql/", {
    headers: {
      accept: "/",
      "accept-language": "en-US,en;q=0.9",
      authorization: "",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      priority: "u=1, i",
      "random-uuid": "5ac75fe9-3bfb-4a64-37d7-47b356e75810",
      "sec-ch-ua":
        '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
      "sec-ch-ua-arch": '"x86"',
      "sec-ch-ua-bitness": '"64"',
      "sec-ch-ua-full-version": '"140.0.7339.207"',
      "sec-ch-ua-full-version-list":
        '"Chromium";v="140.0.7339.207", "Not=A?Brand";v="24.0.0.0", "Google Chrome";v="140.0.7339.207"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"Windows"',
      "sec-ch-ua-platform-version": '"19.0.0"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      uuuserid: "e27a0311300b27f5b796e5953019f618",
      "x-csrftoken":
        "yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr",
      cookie:
        'ip_check=(false, "49.36.144.140"); __stripe_mid=bb62c8ca-3e23-4e31-bb55-a95d7174164599bfa0; INGRESSCOOKIE=d358445ae6e02af04f14e31dd88e9fcd|8e0876c7c1464cc0ac96bc2edceabd27; __stripe_sid=54c4a1c4-cc49-4f31-aa61-543cc4a24bdd40b7dc; cf_clearance=ljQ.hPQK3emHz7tXXHrTOl9Fs9oGDNnK9GXHv5clSvQ-1758999367-1.2.1.1-UZn7e2wDyifdZNrvXRkmP.77kgkJNX6DbTSUHcOthzYRf64AT_nwkr7c4EYaiETylCDM9V50hXIYSS8Dyiu1sb26b.yHjsUfNSbqTeSkRCrK3.Sdtgc2s4tFvHoZPVwIK_ll_y_JFY71DPX1Z_3bVlxvk4_b5cRxlyiMSjvzYeyvikrq8bl6P8zEoMFz9XjrQPqVs5IlTt_4dnEN9zJgdEfMyyIRabuCWyVGeOL.VfY; csrftoken=yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr; messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtVRiswvVchILEtVKM5Mz0tNUcgvLdFTitXBpTy4NDkZKJJWmpNTCdOSmaeQWKwQleMRZFKQV5BigE8_1awrzsxJzStJzizISC0CmhALAF--TEs:1v2a5d:VwHKoZWx8SpoNl_GGbXhLvOZPUw4I5XQ1igYLjTftqM; LEETCODE_SESSION=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiNzYyMDM1MyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZGJhODY1YTVlYmVmNGE2Mjc5OTEyZDhmYzE3NWM5ODhjNDdiNjk4ZDliMGU0NWI3ZTc2MTJmYmJlMzM3Y2IzOSIsInNlc3Npb25fdXVpZCI6ImJiMmQ4MmJjIiwiaWQiOjc2MjAzNTMsImVtYWlsIjoiZ3VuamFuYWdnYXJ3YWwxMjM0NUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imxlcm5vX2JyZWVkIiwidXNlcl9zbHVnIjoibGVybm9fYnJlZWQiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvbGVybm9fYnJlZWQvYXZhdGFyXzE3Mjc1OTQwMjgucG5nIiwicmVmcmVzaGVkX2F0IjoxNzU4OTk5MzczLCJpcCI6IjQ5LjM2LjE0NC4xNDAiLCJpZGVudGl0eSI6ImEzZjU3YmJlMjFjNGUzMDM3OTIyOGFkNzc4OGYyMjRkIiwiZGV2aWNlX3dpdGhfaXAiOlsiZTI3YTAzMTEzMDBiMjdmNWI3OTZlNTk1MzAxOWY2MTgiLCI0OS4zNi4xNDQuMTQwIl0sIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.krmS0eurXYMXUId1EA2CF4Cc3WYoNzDooyiZuPGiS5I; _dd_s=rum=0&expire=1759000275115',
      Referer: `https://leetcode.com/problems/${slug}/?envType=daily-question&envId=2025-09-30`,
    },
    body: `{\"query\":\"\\n    query questionDetail($titleSlug: String!) {\\n  languageList {\\n    id\\n    name\\n  }\\n  submittableLanguageList {\\n    id\\n    name\\n    verboseName\\n  }\\n  statusList {\\n    id\\n    name\\n  }\\n  questionDiscussionTopic(questionSlug: $titleSlug) {\\n    id\\n    commentCount\\n    topLevelCommentCount\\n  }\\n  ugcArticleOfficialSolutionArticle(questionSlug: $titleSlug) {\\n    uuid\\n    chargeType\\n    canSee\\n    hasVideoArticle\\n  }\\n  question(titleSlug: $titleSlug) {\\n    title\\n    titleSlug\\n    questionId\\n    questionFrontendId\\n    questionTitle\\n    translatedTitle\\n    content\\n    translatedContent\\n    categoryTitle\\n    difficulty\\n    stats\\n    companyTagStatsV2\\n    topicTags {\\n      name\\n      slug\\n      translatedName\\n    }\\n    similarQuestionList {\\n      difficulty\\n      titleSlug\\n      title\\n      translatedTitle\\n      isPaidOnly\\n    }\\n    mysqlSchemas\\n    dataSchemas\\n    frontendPreviews\\n    likes\\n    dislikes\\n    isPaidOnly\\n    status\\n    canSeeQuestion\\n    enableTestMode\\n    metaData\\n    enableRunCode\\n    enableSubmit\\n    enableDebugger\\n    envInfo\\n    isLiked\\n    nextChallenges {\\n      difficulty\\n      title\\n      titleSlug\\n      questionFrontendId\\n    }\\n    libraryUrl\\n    adminUrl\\n    hints\\n    codeSnippets {\\n      code\\n      lang\\n      langSlug\\n    }\\n    exampleTestcaseList\\n    hasFrontendPreview\\n    featuredContests {\\n      titleSlug\\n      title\\n    }\\n  }\\n}\\n    \",\"variables\":{\"titleSlug\":\"${slug}\"},\"operationName\":\"questionDetail\"}`,
    method: "POST",
  });
    const res = await response.json();
    return res.data.question.questionId;
}
async function fetchWithRetry(url, options, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed for ${url}: ${error.message}`);
      if (i < retries - 1) {
        await sleep(delay * (i + 1)); // exponential backoff
      } else {
        console.error(`All ${retries} attempts failed for ${url}.`);
        throw error;
      }
    }
  }
}

async function generateContentFromGemini(prompt, retries = 3, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const languageprompt = `
    1.Extract the language indentifier from the give code block. Example of language indentifier are python, java, cpp.
    2. Only provide reponse in the format "python", "java", "cpp". don't give any other text.
    3. If there are many code blocks of different languages, then extract the code block which is either python, java or cpp. If there are multiple code blocks of these languages, then extract the first one.
    CODE BLOCK- ${prompt}
  `;
      const finalprompt = `
You are an expert code extractor and formatter.

**Instructions:**
1.  Analyze the provided text, which contains a mix of natural language and multiple code blocks.
2.  Your sole task is to **extract only the complete, functional code blocks**.
3.  **DO NOT** include any introductory text, explanation, or comments about the code.
4.  Apply the following **Output Formatting Rules** to each extracted block:
5. Remove language identifiers name like "python", "java", "cpp" from the code blocks.
6. If there are many code blocks of different languages, then extract the code block which is either python, java or cpp. If there are multiple code blocks of these languages, then extract the first one.
7. Please follow these rules strictly:
    * **For Python Code:** The code must be enclosed strictly within a single standard Markdown code block, retaining the language identifier (e.g., \`\`\`python ).
    * **For Java or C++ Code:** The code must be enclosed in a single Markdown code block, but you **MUST remove the language identifier line** (e.g., replace \`\`\`java  with just \`\`\` ).

**Input Text to Analyze:**
${prompt}`;

      const result = await model.generateContent(finalprompt);
      const response = result.response;
      const language = await model.generateContent(languageprompt);

      const content = response.text();
      return { content, language: language.response.text() };
    } catch (error) {
      console.error(`Gemini API call attempt ${i + 1} failed: ${error}`);
      if (i < retries - 1) {
        await sleep(delay);
      } else {
        console.error("Gemini API call failed after multiple retries.");
        return { content: null, language: null };
      }
    }
  }
}

async function main() {
  try {
    const dailyQuestionData = await fetchWithRetry(
      "https://leetcode.com/graphql/",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          authorization: "",
          baggage:
            "sentry-environment=production,sentry-release=e99ce359,sentry-transaction=%2Fproblemset%2F%5B%5B...slug%5D%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=0445d479d373429391f89a574ac2caf3,sentry-sample_rate=0.03",
          "content-type": "application/json",
          priority: "u=1, i",
          "random-uuid": "ed4778d1-0f17-5430-f621-9c1f9e6c14e6",
          "sec-ch-ua":
            '"Chromium";v="140", "Not=A?Brand";v="24", "Brave";v="140"',
          "sec-ch-ua-arch": '"x86"',
          "sec-ch-ua-bitness": '"64"',
          "sec-ch-ua-full-version-list":
            '"Chromium";v="140.0.0.0", "Not=A?Brand";v="24.0.0.0", "Brave";v="140.0.0.0"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"Windows"',
          "sec-ch-ua-platform-version": '"19.0.0"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "sentry-trace": "0445d479d373429391f89a574ac2caf3-8ffb8c07bb881109-0",
          uuuserid: "e27a0311300b27f5b796e5953019f618",
          "x-csrftoken":
            "yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr",
          cookie:
            'ip_check=(false, "49.36.144.140"); __stripe_mid=bb62c8ca-3e23-4e31-bb55-a95d7174164599bfa0; INGRESSCOOKIE=d358445ae6e02af04f14e31dd88e9fcd|8e0876c7c1464cc0ac96bc2edceabd27; __stripe_sid=54c4a1c4-cc49-4f31-aa61-543cc4a24bdd40b7dc; cf_clearance=ljQ.hPQK3emHz7tXXHrTOl9Fs9oGDNnK9GXHv5clSvQ-1758999367-1.2.1.1-UZn7e2wDyifdZNrvXRkmP.77kgkJNX6DbTSUHcOthzYRf64AT_nwkr7c4EYaiETylCDM9V50hXIYSS8Dyiu1sb26b.yHjsUfNSbqTeSkRCrK3.Sdtgc2s4tFvHoZPVwIK_ll_y_JFY71DPX1Z_3bVlxvk4_b5cRxlyiMSjvzYeyvikrq8bl6P8zEoMFz9XjrQPqVs5IlTt_4dnEN9zJgdEfMyyIRabuCWyVGeOL.VfY; csrftoken=yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr; messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtVRiswvVchILEtVKM5Mz0tNUcgvLdFTitXBpTy4NDkZKJJWmpNTCdOSmaeQWKwQleMRZFKQV5BigE8_1awrzsxJzStJzizISC0CmhALAF--TEs:1v2a5d:VwHKoZWx8SpoNl_GGbXhLvOZPUw4I5XQ1igYLjTftqM; LEETCODE_SESSION=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiNzYyMDM1MyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZGJhODY1YTVlYmVmNGE2Mjc5OTEyZDhmYzE3NWM5ODhjNDdiNjk4ZDliMGU0NWI3ZTc2MTJmYmJlMzM3Y2IzOSIsInNlc3Npb25fdXVpZCI6ImJiMmQ4MmJjIiwiaWQiOjc2MjAzNTMsImVtYWlsIjoiZ3VuamFuYWdnYXJ3YWwxMjM0NUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imxlcm5vX2JyZWVkIiwidXNlcl9zbHVnIjoibGVybm9fYnJlZWQiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvbGVybm9fYnJlZWQvYXZhdGFyXzE3Mjc1OTQwMjgucG5nIiwicmVmcmVzaGVkX2F0IjoxNzU4OTk5MzczLCJpcCI6IjQ5LjM2LjE0NC4xNDAiLCJpZGVudGl0eSI6ImEzZjU3YmJlMjFjNGUzMDM3OTIyOGFkNzc4OGYyMjRkIiwiZGV2aWNlX3dpdGhfaXAiOlsiZTI3YTAzMTEzMDBiMjdmNWI3OTZlNTk1MzAxOWY2MTgiLCI0OS4zNi4xNDQuMTQwIl0sIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.krmS0eurXYMXUId1EA2CF4Cc3WYoNzDooyiZuPGiS5I; _dd_s=rum=0&expire=1759000275115',
          Referer: "https://leetcode.com/problemset/",
        },
        body: '{"query":"\\n    query questionOfToday {\\n  activeDailyCodingChallengeQuestion {\\n    date\\n    userStatus\\n    link\\n    question {\\n      titleSlug\\n      title\\n      translatedTitle\\n      acRate\\n      difficulty\\n      freqBar\\n      frontendQuestionId: questionFrontendId\\n      isFavor\\n      paidOnly: isPaidOnly\\n      status\\n      hasVideoSolution\\n      hasSolution\\n      topicTags {\\n        name\\n        id\\n        slug\\n      }\\n    }\\n  }\\n}\\n    ","variables":{},"operationName":"questionOfToday"}',
        method: "POST",
      }
    );

    const question =
      dailyQuestionData.data.activeDailyCodingChallengeQuestion.question;
    const titleSlug = question.titleSlug;
    const questionId = await extractquestionid(titleSlug);

    const solutionsData = await fetchWithRetry(
      "https://leetcode.com/graphql/",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          authorization: "",
          baggage:
            "sentry-environment=production,sentry-release=e99ce359,sentry-transaction=%2Fproblems%2F%5Bslug%5D%2F%5B%5B...tab%5D%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=937986e1bce04735ba2a9fddbaf3788a,sentry-sample_rate=0.03",
          "content-type": "application/json",
          priority: "u=1, i",
          "random-uuid": "ed4778d1-0f17-5430-f621-9c1f9e6c14e6",
          "sec-ch-ua":
            '"Chromium";v="140", "Not=A?Brand";v="24", "Brave";v="140"',
          "sec-ch-ua-arch": '"x86"',
          "sec-ch-ua-bitness": '"64"',
          "sec-ch-ua-full-version-list":
            '"Chromium";v="140.0.0.0", "Not=A?Brand";v="24.0.0.0", "Brave";v="140.0.0.0"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"Windows"',
          "sec-ch-ua-platform-version": '"19.0.0"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "sentry-trace": "937986e1bce04735ba2a9fddbaf3788a-858928e8636709b6-0",
          "x-csrftoken":
            "yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr",
          cookie:
            'ip_check=(false, "49.36.144.140"); __stripe_mid=bb62c8ca-3e23-4e31-bb55-a95d7174164599bfa0; INGRESSCOOKIE=d358445ae6e02af04f14e31dd88e9fcd|8e0876c7c1464cc0ac96bc2edceabd27; __stripe_sid=54c4a1c4-cc49-4f31-aa61-543cc4a24bdd40b7dc; cf_clearance=ljQ.hPQK3emHz7tXXHrTOl9Fs9oGDNnK9GXHv5clSvQ-1758999367-1.2.1.1-UZn7e2wDyifdZNrvXRkmP.77kgkJNX6DbTSUHcOthzYRf64AT_nwkr7c4EYaiETylCDM9V50hXIYSS8Dyiu1sb26b.yHjsUfNSbqTeSkRCrK3.Sdtgc2s4tFvHoZPVwIK_ll_y_JFY71DPX1Z_3bVlxvk4_b5cRxlyiMSjvzYeyvikrq8bl6P8zEoMFz9XjrQPqVs5IlTt_4dnEN9zJgdEfMyyIRabuCWyVGeOL.VfY; csrftoken=yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr; messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtVRiswvVchILEtVKM5Mz0tNUcgvLdFTitXBpTy4NDkZKJJWmpNTCdOSmaeQWKwQleMRZFKQV5BigE8_1awrzsxJzStJzizISC0CmhALAF--TEs:1v2a5d:VwHKoZWx8SpoNl_GGbXhLvOZPUw4I5XQ1igYLjTftqM; LEETCODE_SESSION=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiNzYyMDM1MyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZGJhODY1YTVlYmVmNGE2Mjc5OTEyZDhmYzE3NWM5ODhjNDdiNjk4ZDliMGU0NWI3ZTc2MTJmYmJlMzM3Y2IzOSIsInNlc3Npb25fdXVpZCI6ImJiMmQ4MmJjIiwiaWQiOjc2MjAzNTMsImVtYWlsIjoiZ3VuamFuYWdnYXJ3YWwxMjM0NUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imxlcm5vX2JyZWVkIiwidXNlcl9zbHVnIjoibGVybm9fYnJlZWQiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvbGVybm9fYnJlZWQvYXZhdGFyXzE3Mjc1OTQwMjgucG5nIiwicmVmcmVzaGVkX2F0IjoxNzU4OTk5MzczLCJpcCI6IjQ5LjM2LjE0NC4xNDAiLCJpZGVudGl0eSI6ImEzZjU3YmJlMjFjNGUzMDM3OTIyOGFkNzc4OGYyMjRkIiwiZGV2aWNlX3dpdGhfaXAiOlsiZTI3YTAzMTEzMDBiMjdmNWI3OTZlNTk1MzAxOWY2MTgiLCI0OS4zNi4xNDQuMTQwIl0sIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.krmS0eurXYMXUId1EA2CF4Cc3WYoNzDooyiZuPGiS5I; _dd_s=rum=0&expire=1759000275115',
          Referer: `https://leetcode.com/problems/${titleSlug}/solutions/`,
        },
        body: `{\"query\":\"\\n    query ugcArticleSolutionArticles($questionSlug: String!, $orderBy: ArticleOrderByEnum, $userInput: String, $tagSlugs: [String!], $skip: Int, $before: String, $after: String, $first: Int, $last: Int, $isMine: Boolean) {\\n  ugcArticleSolutionArticles(\\n    questionSlug: $questionSlug\\n    orderBy: $orderBy\\n    userInput: $userInput\\n    tagSlugs: $tagSlugs\\n    skip: $skip\\n    first: $first\\n    before: $before\\n    after: $after\\n    last: $last\\n    isMine: $isMine\\n  ) {\\n    totalNum\\n    pageInfo {\\n      hasNextPage\\n    }\\n    edges {\\n      node {\\n        ...ugcSolutionArticleFragment\\n      }\\n    }\\n  }\\n}\\n    \\n    fragment ugcSolutionArticleFragment on SolutionArticleNode {\\n  uuid\\n  title\\n  slug\\n  summary\\n  author {\\n    realName\\n    userAvatar\\n    userSlug\\n    userName\\n    nameColor\\n    certificationLevel\\n    activeBadge {\\n      icon\\n      displayName\\n    }\\n  }\\n  articleType\\n  thumbnail\\n  summary\\n  createdAt\\n  updatedAt\\n  status\\n  isLeetcode\\n  canSee\\n  canEdit\\n  isMyFavorite\\n  chargeType\\n  myReactionType\\n  topicId\\n  hitCount\\n  hasVideoArticle\\n  reactions {\\n    count\\n    reactionType\\n  }\\n  title\\n  slug\\n  tags {\\n    name\\n    slug\\n    tagType\\n  }\\n  topic {\\n    id\\n    topLevelCommentCount\\n  }\\n}\\n    \",\"variables\":{\"questionSlug\":\"${titleSlug}\",\"skip\":0,\"first\":15,\"orderBy\":\"HOT\",\"userInput\":\"\",\"tagSlugs\":[]},\"operationName\":\"ugcArticleSolutionArticles\"}`,
        method: "POST",
      }
    );

    let articles = solutionsData.data.ugcArticleSolutionArticles.edges;
    articles = articles.splice(1, 15);
    const topicIdsSorted = articles
      .map((edge) => ({
        topicId: edge.node.topicId,
        hitCount: edge.node.hitCount,
      }))
      .sort((a, b) => b.hitCount - a.hitCount)
      .map((item) => item.topicId);

    // Only process the first 5 topic IDs
    for (const id of topicIdsSorted.slice(0, 5)) {
      try {
        await sleep(5000); // Increased delay to 5 seconds to avoid rate limiting
        const articleData = await fetchWithRetry(
          "https://leetcode.com/graphql/",
          {
            headers: {
              accept: "*/*",
              "accept-language": "en-US,en;q=0.9",
              authorization: "",
              "content-type": "application/json",
              priority: "u=1, i",
              "random-uuid": "ed4778d1-0f17-5430-f621-9c1f9e6c14e6",
              "sec-ch-ua":
                '"Chromium";v="140", "Not=A?Brand";v="24", "Brave";v="140"',
              "sec-ch-ua-arch": '"x86"',
              "sec-ch-ua-bitness": '"64"',
              "sec-ch-ua-full-version-list":
                '"Chromium";v="140.0.0.0", "Not=A?Brand";v="24.0.0.0", "Brave";v="140.0.0.0"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-model": '""',
              "sec-ch-ua-platform": '"Windows"',
              "sec-ch-ua-platform-version": '"19.0.0"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              uuuserid: "e27a0311300b27f5b796e5953019f618",
              "x-csrftoken":
                "yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr",
              cookie:
                'ip_check=(false, "49.36.144.140"); __stripe_mid=bb62c8ca-3e23-4e31-bb55-a95d7174164599bfa0; INGRESSCOOKIE=d358445ae6e02af04f14e31dd88e9fcd|8e0876c7c1464cc0ac96bc2edceabd27; __stripe_sid=54c4a1c4-cc49-4f31-aa61-543cc4a24bdd40b7dc; cf_clearance=ljQ.hPQK3emHz7tXXHrTOl9Fs9oGDNnK9GXHv5clSvQ-1758999367-1.2.1.1-UZn7e2wDyifdZNrvXRkmP.77kgkJNX6DbTSUHcOthzYRf64AT_nwkr7c4EYaiETylCDM9V50hXIYSS8Dyiu1sb26b.yHjsUfNSbqTeSkRCrK3.Sdtgc2s4tFvHoZPVwIK_ll_y_JFY71DPX1Z_3bVlxvk4_b5cRxlyiMSjvzYeyvikrq8bl6P8zEoMFz9XjrQPqVs5IlTt_4dnEN9zJgdEfMyyIRabuCWyVGeOL.VfY; csrftoken=yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr; messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtVRiswvVchILEtVKM5Mz0tNUcgvLdFTitXBpTy4NDkZKJJWmpNTCdOSmaeQWKwQleMRZFKQV5BigE8_1awrzsxJzStJzizISC0CmhALAF--TEs:1v2a5d:VwHKoZWx8SpoNl_GGbXhLvOZPUw4I5XQ1igYLjTftqM; LEETCODE_SESSION=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiNzYyMDM1MyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZGJhODY1YTVlYmVmNGE2Mjc5OTEyZDhmYzE3NWM5ODhjNDdiNjk4ZDliMGU0NWI3ZTc2MTJmYmJlMzM3Y2IzOSIsInNlc3Npb25fdXVpZCI6ImJiMmQ4MmJjIiwiaWQiOjc2MjAzNTMsImVtYWlsIjoiZ3VuamFuYWdnYXJ3YWwxMjM0NUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imxlcm5vX2JyZWVkIiwidXNlcl9zbHVnIjoibGVybm9fYnJlZWQiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvbGVybm9fYnJlZWQvYXZhdGFyXzE3Mjc1OTQwMjgucG5nIiwicmVmcmVzaGVkX2F0IjoxNzU4OTk5MzczLCJpcCI6IjQ5LjM2LjE0NC4xNDAiLCJpZGVudGl0eSI6ImEzZjU3YmJlMjFjNGUzMDM3OTIyOGFkNzc4OGYyMjRkIiwiZGV2aWNlX3dpdGhfaXAiOlsiZTI3YTAzMTEzMDBiMjdmNWI3OTZlNTk1MzAxOWY2MTgiLCI0OS4zNi4xNDQuMTQwIl0sIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.krmS0eurXYMXUId1EA2CF4Cc3WYoNzDooyiZuPGiS5I; _dd_s=rum=0&expire=1759000275115',
              Referer: `https://leetcode.com/problems/${titleSlug}/solutions/`,
            },
            body: `{"query":"\\n    query ugcArticleSolutionArticle($articleId: ID, $topicId: ID) {\\n  ugcArticleSolutionArticle(articleId: $articleId, topicId: $topicId) {\\n    ...ugcSolutionArticleFragment\\n    content\\n    isSerialized\\n    isAuthorArticleReviewer\\n    scoreInfo {\\n      scoreCoefficient\\n    }\\n    prev {\\n      uuid\\n      slug\\n      topicId\\n      title\\n    }\\n    next {\\n      uuid\\n      slug\\n      topicId\\n      title\\n    }\\n  }\\n}\\n    \\n    fragment ugcSolutionArticleFragment on SolutionArticleNode {\\n  uuid\\n  title\\n  slug\\n  summary\\n  author {\\n    realName\\n    userAvatar\\n    userSlug\\n    userName\\n    nameColor\\n    certificationLevel\\n    activeBadge {\\n      icon\\n      displayName\\n    }\\n  }\\n  articleType\\n  thumbnail\\n  summary\\n  createdAt\\n  updatedAt\\n  status\\n  isLeetcode\\n  canSee\\n  canEdit\\n  isMyFavorite\\n  chargeType\\n  myReactionType\\n  topicId\\n  hitCount\\n  hasVideoArticle\\n  reactions {\\n    count\\n    reactionType\\n  }\\n  title\\n  slug\\n  tags {\\n    name\\n    slug\\n    tagType\\n  }\\n  topic {\\n    id\\n    topLevelCommentCount\\n  }\\n}\\n    ","variables":{"topicId":"${id}"},"operationName":"ugcArticleSolutionArticle"}`,
            method: "POST",
          }
        );

        const article = articleData.data.ugcArticleSolutionArticle;
        const { content, language } = await generateContentFromGemini(
          article.content
        );
        if (!content || !language) {
          console.log("No content or language extracted, skipping...");
          continue;
        }
        console.log("titleSlug:", titleSlug);
        console.log("language:", language);
        console.log("questionId:", questionId);
        const submissionData = await fetchWithRetry(
          `https://leetcode.com/problems/${titleSlug}/submit/`,
          {
            headers: {
              accept: "*/*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/json",
              priority: "u=1, i",
              "sec-ch-ua":
                '"Chromium";v="140", "Not=A?Brand";v="24", "Brave";v="140"',
              "sec-ch-ua-arch": '"x86"',
              "sec-ch-ua-bitness": '"64"',
              "sec-ch-ua-full-version-list":
                '"Chromium";v="140.0.0.0", "Not=A?Brand";v="24.0.0.0", "Brave";v="140.0.0.0"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-model": '""',
              "sec-ch-ua-platform": '"Windows"',
              "sec-ch-ua-platform-version": '"19.0.0"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "x-csrftoken":
                "yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr",
              cookie:
                'ip_check=(false, "49.36.144.140"); __stripe_mid=bb62c8ca-3e23-4e31-bb55-a95d7174164599bfa0; INGRESSCOOKIE=d358445ae6e02af04f14e31dd88e9fcd|8e0876c7c1464cc0ac96bc2edceabd27; __stripe_sid=54c4a1c4-cc49-4f31-aa61-543cc4a24bdd40b7dc; cf_clearance=ljQ.hPQK3emHz7tXXHrTOl9Fs9oGDNnK9GXHv5clSvQ-1758999367-1.2.1.1-UZn7e2wDyifdZNrvXRkmP.77kgkJNX6DbTSUHcOthzYRf64AT_nwkr7c4EYaiETylCDM9V50hXIYSS8Dyiu1sb26b.yHjsUfNSbqTeSkRCrK3.Sdtgc2s4tFvHoZPVwIK_ll_y_JFY71DPX1Z_3bVlxvk4_b5cRxlyiMSjvzYeyvikrq8bl6P8zEoMFz9XjrQPqVs5IlTt_4dnEN9zJgdEfMyyIRabuCWyVGeOL.VfY; csrftoken=yi5VOYdS33gaTrPfhMjTyWXHHVOfkVQYOJGboXSoaPkwRNE9cSrPFhuQNezgtTwr; messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtVRiswvVchILEtVKM5Mz0tNUcgvLdFTitXBpTy4NDkZKJJWmpNTCdOSmaeQWKwQleMRZFKQV5BigE8_1awrzsxJzStJzizISC0CmhALAF--TEs:1v2a5d:VwHKoZWx8SpoNl_GGbXhLvOZPUw4I5XQ1igYLjTftqM; LEETCODE_SESSION=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiNzYyMDM1MyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZGJhODY1YTVlYmVmNGE2Mjc5OTEyZDhmYzE3NWM5ODhjNDdiNjk4ZDliMGU0NWI3ZTc2MTJmYmJlMzM3Y2IzOSIsInNlc3Npb25fdXVpZCI6ImJiMmQ4MmJjIiwiaWQiOjc2MjAzNTMsImVtYWlsIjoiZ3VuamFuYWdnYXJ3YWwxMjM0NUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imxlcm5vX2JyZWVkIiwidXNlcl9zbHVnIjoibGVybm9fYnJlZWQiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvbGVybm9fYnJlZWQvYXZhdGFyXzE3Mjc1OTQwMjgucG5nIiwicmVmcmVzaGVkX2F0IjoxNzU4OTk5MzczLCJpcCI6IjQ5LjM2LjE0NC4xNDAiLCJpZGVudGl0eSI6ImEzZjU3YmJlMjFjNGUzMDM3OTIyOGFkNzc4OGYyMjRkIiwiZGV2aWNlX3dpdGhfaXAiOlsiZTI3YTAzMTEzMDBiMjdmNWI3OTZlNTk1MzAxOWY2MTgiLCI0OS4zNi4xNDQuMTQwIl0sIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.krmS0eurXYMXUId1EA2CF4Cc3WYoNzDooyiZuPGiS5I; _dd_s=rum=0&expire=1759000275115',
              Referer: `https://leetcode.com/problems/${titleSlug}/description/`,
            },
            body: JSON.stringify({
              lang: language.trim(), // Also trim whitespace from the language response
              question_id: String(questionId).trim(), // Use the correct ID
              typed_code: removeCodeBlockMarkers(content),
            }),
            method: "POST",
          }
        );
        console.log("Submission response:", submissionData);
      } catch (error) {
        console.error(`Failed to process topic ID ${id}:`, error.message);
        console.log(`Skipping to next topic ID...`);
      }
    }
  } catch (error) {
    console.error("A critical error occurred in the main process:", error);
  }
}

main();
