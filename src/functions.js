import axios from "./axios";

const getAvatar = async username => {
  const placeholder = "https://via.placeholder.com/200x200?text=No avatar";
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    if (data) return data.avatar_url || placeholder;
  } catch (e) {
    return placeholder;
  }
};

const getData = async username => {
  try {
    const { data, status } = await axios.get(
      `https://api.github.com/users/${username}/events/public`
    );
    return status == 200
      ? new Data(parseGithubData(data, username))
      : new Error(status);
  } catch (e) {
    return new Error(e.message);
  }
};

class Data {
  constructor(data) {
    this.data = data;
  }
}

class Error {
  constructor(error) {
    this.error = error;
  }
}

export { getAvatar, getData };
export { Data, Error };

const parseGithubData = (data, username) =>
  data
    .filter(
      x => x.type === "PushEvent" && x.actor.login.toLowerCase() === username
    )
    .map(x => x.payload.commits)
    .reduce((a, c) => a.concat(c), [])
    .map(x => x.author)
    .reduce(
      ({ uq, res }, { name, email }) => {
        const key = [name, email].join(":");
        return uq.has(key)
          ? { uq, res }
          : { uq: uq.add(key), res: [...res, { name, email }] };
      },
      { res: [], uq: new Set() }
    ).res;
