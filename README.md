# BoomTown Technical Assessment

## Requirements:
Using the GitHub API and your language of choice, pull top-level details for the BoomTownROI organization at:
https://api.github.com/orgs/boomtownroi
From the top-level organization details result object, complete the following two steps:
1. Output Data:

- Follow all urls containing &quot;api.github.com/orgs/BoomTownROI&quot; in the path, and for responses
with a 200 status code, retrieve and display all &#39;id&#39; keys/values in the response objects. For all
non-200 status codes, give some indication of the failed request. HINT: Devise a way for the end
user to make sense of the id values, related to the original resource route used to retrieve the data.

2. Perform Verifications:
- On the top-level BoomTownROI organization details object, verify that the &#39;updated_at&#39; value
is later than the &#39;created_at&#39; date.
- On the top-level details object, compare the &#39;public_repos&#39; count against the repositories array
returned from following the &#39;repos_url&#39;, verifying that the counts match. HINT: The public
repositories resource only returns a default limit of 30 repo objects per request.
Extra Credit: Come up with a way to visualize all of the output from the previous bullet points,
using React. This is purposely open ended to allow for some creativity. This section is
completely optional, in case you have UI experience that you’d like to share with us.