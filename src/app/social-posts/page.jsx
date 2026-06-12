import HudTag from '@/components/motion/hud-tag'
import PageHeader from '@/components/nav/page-header'
import PostCard from '@/components/social-posts/post-card'

export const metadata = {
  title: 'Social Posts — The Oz Cast',
  description: 'Internal gallery of social media post designs. Not for public distribution.',
  robots: { index: false, follow: false }
}

const FEED_POSTS = [
  { file: 'feed-01.html', number: 'FEED 01', name: 'Brand Statement' },
  { file: 'feed-02.html', number: 'FEED 02', name: 'New Episode EP 06' },
  { file: 'feed-03.html', number: 'FEED 03', name: 'Quote Card' },
  { file: 'feed-04.html', number: 'FEED 04', name: 'Listener Milestone' },
  { file: 'feed-05.html', number: 'FEED 05', name: 'EP 05 Shawn Ryan Show' },
  { file: 'feed-06.html', number: 'FEED 06', name: 'About Oz' },
  { file: 'feed-07.html', number: 'FEED 07', name: 'Membership' },
  { file: 'feed-08.html', number: 'FEED 08', name: 'Episode Archive' },
  { file: 'feed-09.html', number: 'FEED 09', name: 'Shadow Warriors Project' },
  { file: 'feed-10.html', number: 'FEED 10', name: 'Newsletter' }
]

const STORY_POSTS = [
  { file: 'story-01.html', number: 'STORY 01', name: 'EP 04 Clip Hook' },
  { file: 'story-02.html', number: 'STORY 02', name: 'Thirteen Hours' },
  { file: 'story-03.html', number: 'STORY 03', name: 'Keynotes & Speaking' },
  { file: 'story-04.html', number: 'STORY 04', name: 'As Seen On' },
  { file: 'story-05.html', number: 'STORY 05', name: 'NCLS Keynote' },
  { file: 'story-06.html', number: 'STORY 06', name: 'Operator Circle' },
  { file: 'story-07.html', number: 'STORY 07', name: 'Vanishing Children' },
  { file: 'story-08.html', number: 'STORY 08', name: 'HB 1163' },
  { file: 'story-09.html', number: 'STORY 09', name: 'Subscribe' },
  { file: 'story-10.html', number: 'STORY 10', name: 'Sign-Off' }
]

const SocialPostsPage = () => {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="INTERNAL · UNLISTED"
        title="SOCIAL"
        accent="POSTS."
        lead="Live previews of the social post designs. Each card renders the actual HTML file — click any card to open it full-size in a new tab."
      />

      <section aria-labelledby="feed-posts" className="container-x pb-24 lg:pb-32">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
          <h2
            id="feed-posts"
            className="display-lg text-ink"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 0.92 }}
          >
            FEED POSTS
          </h2>
          <HudTag color="mute">1080 × 1080 · {FEED_POSTS.length} POSTS</HudTag>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEED_POSTS.map((post) => (
            <PostCard key={post.file} {...post} aspect="square" />
          ))}
        </div>
      </section>

      <section aria-labelledby="story-posts" className="container-x pb-24 lg:pb-36">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
          <h2
            id="story-posts"
            className="display-lg text-ink"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 0.92 }}
          >
            STORY POSTS
          </h2>
          <HudTag color="mute">1080 × 1920 · {STORY_POSTS.length} POSTS</HudTag>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {STORY_POSTS.map((post) => (
            <PostCard key={post.file} {...post} aspect="story" />
          ))}
        </div>
      </section>
    </main>
  )
}

export default SocialPostsPage
