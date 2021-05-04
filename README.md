# The Shoppies: Movie awards for entrepreneurs

Shopify has branched out into movie award shows and we need your help. Please build us an app to help manage our movie nominations for the upcoming Shoppies.

## The Challenge

We need a webpage that can search [OMDB](http://www.omdbapi.com/) for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:
- Search OMDB and display the results (movies only)
- Add a movie from the search results to our nomination list
- View the list of films already nominated
- Remove a nominee from the nomination list

Technical requirements
- Search results should come from OMDB's API (free API key: [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)).
- Each search result should list at least its title, year of release and a button to nominate that film.
- Updates to the search terms should update the result list
- Movies in search results can be added and removed from the nomination list.
- If a search result has already been nominated, disable its nominate button.
- Display a banner when the user has 5 nominations.

## Preview


### Dekstop View

![image](https://user-images.githubusercontent.com/22878284/116953439-3f5d1b80-ac5b-11eb-9581-ac87415de665.png)

### Ipad View

![image](https://user-images.githubusercontent.com/22878284/116953583-a37fdf80-ac5b-11eb-84de-2160249c96d8.png)

### Mobile View

![image](https://user-images.githubusercontent.com/22878284/116953547-9236d300-ac5b-11eb-921f-612699d4023d.png)

### Prerequisites

The Shoppies was built by Next.js and Tailwind CSS

## Installation

Install all the packages.
```
yarn install
```

First, get your API Key from [here](http://www.omdbapi.com/apikey.aspx), then create a `.env.local` file in the root folder, and put your API key there.
```
NEXT_PUBLIC_OMDB_API_KEY=your-api-key-without-quote
```

Finally, run the server,
```
yarn run dev
```

and open [http://localhost:3000](http://localhost:3000) with your browser.
