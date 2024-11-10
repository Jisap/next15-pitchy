
import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?:string}>}) {

  const query = (await searchParams).query;

  const posts = [
    {
      _creartedAt: new Date(),
      views: 55,
      author: {_id: 1, name: 'John Doe' },
      _id: 1,
      description: 'This is a description',
      image: 'https://plus.unsplash.com/premium_photo-1682814732010-d7f4917fad03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cm9ib3RzfGVufDB8fDB8fHww',
      category: 'Robots',
      title: 'We Robots'
    },
    {
      _creartedAt: new Date(),
      views: 55,
      author: {_id: 2, name: 'Jane Doe' },
      _id: 2,
      description: 'This is a description',
      image: 'https://images.unsplash.com/photo-1533915828531-55b274d98dc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJvYm90c3xlbnwwfHwwfHx8MA%3D%3D',
      category: 'Robots',
      title: 'Some Robots'
    },
    

  ]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br/> Connect With Entrepeneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in virtual competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section-container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card-grid">
          {posts?.length > 0 ? (
            posts.map((post:StartupTypeCard, index:number) => (
              <StartupCard 
                key={post?._id}
                post={post}
              />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
