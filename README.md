# Context

[![Netlify Status](https://api.netlify.com/api/v1/badges/f7ea478d-cfcd-4e24-af1c-e0918ba000e0/deploy-status)](https://app.netlify.com/projects/pokeforge/deploys)
<br>
Little project to toy with LLM on frontend side.

# Front-Stack:

- React
- Typescript
- Vite
- TanStack Query
- OpenAI SDK
- Axios
- Tailwind / shadcn

Currently API calls are really long:

- 10-15 sec for getting a response from LLM
- 9-55 sec for getting a response from TGC
  4 ways of improvement:
- 1. be more precise on query parameter for TGC endpoint, less pagination, exact name search, type provided
- 2. use streaming on LLM to get response faster, first the list of pokemon then fetch TGC directly to "parrelilize" api calls and not wait for whole LLM response. also improve UX with team description writing in real time
- 3. add parameters to LLM agent to give less acurate response but respond fast
- 4. add better loader / sqeleton to have a better chargement and a better UX, feels better for user
