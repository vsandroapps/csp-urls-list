import React from "react";
import "./style.css";
import authenticated from "./authenticated.json";
import gamesData from "./games.json";
import assessmentData from "./assessment.json";
import challengesData from "./challenges.json";
import articlesData from "./articles.json";
import activityData from "./activity.json";
import videosData from "./videos.json";
import recipesData from "./recipes.json";
import careGiving from "./caregiving.json";

import { extractHostname, groupBy, convertToArray, mergeAll } from "./Utils";

import psl from "psl";

export default function App() {
  let entries = mergeAll([
    authenticated.log.entries,
    gamesData.log.entries,
    assessmentData.log.entries,
    challengesData.log.entries,
    articlesData.log.entries,
    activityData.log.entries,
    videosData.log.entries,
    recipesData.log.entries,
    careGiving.log.entries
  ]);
  entries.forEach(element => {
    element.domain = psl.get(extractHostname(element.request.url));
  });
  let groupData = groupBy(entries, "domain");
  //console.log(groupData);
  //console.log(convertToArray(groupData));
  const content = convertToArray(groupData).map((post, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        {`*.${post.domain} (${post.list.length})`}
      </td>
      <td>
        {post.list.map(url => (
          <li className="urls-list" key={url}>
            {url}
          </li>
        ))}
      </td>
    </tr>
  ));

  return (
    <div className="App">
      <h1>Content Security Policy</h1>
      <h2>List of URLs for CSP</h2>
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Domain</th>
            <th>Url</th>
          </tr>

          {content}
        </tbody>
      </table>
    </div>
  );
}
