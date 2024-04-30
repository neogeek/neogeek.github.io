# The Simple Game That Took Me 6 Years to Release

<i>Published on <time>April 29th, 2024</time></i>

I wanted to make a simple game that would take 30 seconds to play while you were commuting to work, standing in line, or otherwise bored. I came up with an idea in January 2018 and demoed a fully functional game in September of the same year. I finally released it in April 2024.

Why did it take me this long? What happened?

Let me take you on a journey into my mind. A mind wrought with dreams of unit tests, continuous integration, documentation, separation of concerns, and, my favorite, open source.

---

I just wanted to make a game. I had just shelved a prototype I had been working on for months because of an issue I could not solve without learning Blender for the umpteenth time. It was an AR game where you could build a golf course from pre-built pieces and then play it.

A few nights later, I was sitting in my living room fiddling with a deck of cards. Then I started tossing them onto my card table to see if I could get them to land face up. I began to see if I could throw a specific number of cards onto the table to make a decent poker hand.

<div class="images">
  <figure>
    <img src="/images/the-simple-game-that-took-me-6-years-to-release/irl-prototype.jpg" alt="Picture of a coffee table with playing cards on and around it." />
    <figcaption>This is my first attempt at playing Flip Jacks on a coffee table with real playing cards.</figcaption>
  </figure>
</div>

"Huh." I thought, "This could be my next game."

And so it was. Over the next few months, I built a working prototype. I even demoed it at an event before PAX East 2018. This prototype was built to be pretty simple. It worked on a desktop with mouse controls and on mobile with touch controls. Simple enough.

<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/9OFAvr8u9os"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

However, once I started building more features, I found some of Unity's built-in functionality lacking. Like most developers I've talked to, I solved this by creating a small library of reusable components and functions.

This is where it all broke down.

I love open source and sharing what I've learned. So, when I started building simple, reusable components and functions in Unity, I wanted to share them. However, sharing them as is wouldn't work; I would need to clean them up, add tests and documentation, and release them publicly on GitHub. My first open source repo was a collection of these reusable components called [CandyCoded](https://github.com/CandyCoded/CandyCoded).

<div class="repos">
  <github-repo owner="CandyCoded" name="CandyCoded" description="🍭 Custom Unity Components that are delightful" iconUrl="/images/avatars/CandyCoded.png"></github-repo>
</div>

After I made the component library, I realized I would need an AR component library. So, I polished up my custom AR components, wrote a bunch of documentation, and released that as well.

<div class="repos">
  <github-repo owner="CandyCoded" name="ARFoundation-Components" description="📱 Generic components for use with Unity's AR Foundation package" iconUrl="/images/avatars/CandyCoded.png"></github-repo>
</div>

You can see where this is going.

The same thing happened when I built anything reusable, which is why all of these (16) open source projects exist.

<div class="repos">
  <github-repo owner="CandyCoded" name="env" description="Use .env files in your Unity projects." iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="CandyCoded" name="Forms" description="📄 Components used to simplify the handling of form inputs in Unity." iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="CandyCoded" name="AppSettings" description="⚙️ Get app specific settings from the OS." iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="CandyCoded" name="HapticFeedback" description="📳 Perform haptic feedback on both iOS and Android devices." iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="CandyCoded" name="AlertConfirmDialog" description="⚠️ Display simple alert and confirm dialogs on both iOS and Android." iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="CandyCoded" name="SafeAreaLayout" description="A simple component for resizing Canvas objects to fit in the safe area of any device." iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="CandyCoded" name="GitStatus" description="🔧 A simple git status panel for Unity." iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="CandyCoded" name="Unity-iOS-Bridge" description="📱 Bridge for requesting state from an iOS device" iconUrl="/images/avatars/CandyCoded.png"></github-repo>
  <github-repo owner="neogeek" name="ObjectDragInteraction" description="A simple component that adds dragging interaction to any object without config." iconUrl="/images/avatars/neogeek.png"></github-repo>
  <github-repo owner="neogeek" name="find-unity" description="🔧 Command line tool for locating the version of Unity that a project was built with" iconUrl="/images/avatars/neogeek.png"></github-repo>
  <github-repo owner="neogeek" name="unity-check-updates" description="🔧 Command line tool for updating UPM packages." iconUrl="/images/avatars/neogeek.png"></github-repo>
  <github-repo owner="neogeek" name="unity-ci-tools" description="🔧 Bash scripts for running Unity tests on continuous integration services" iconUrl="/images/avatars/neogeek.png"></github-repo>
  <github-repo owner="neogeek" name="get-unity" description="🕹 Command line tool for getting the download URL for the latest or specific version of Unity." iconUrl="/images/avatars/neogeek.png"></github-repo>
  <github-repo owner="neogeek" name="generate-local-changelog" description="Generate a CHANGELOG for your project using only local git history. No internet connection or git server API is required." iconUrl="/images/avatars/neogeek.png"></github-repo>
  <github-repo owner="neogeek" name="lumberlogs" description="📝 A simple log aggregation tool." iconUrl="/images/avatars/neogeek.png"></github-repo>
  <github-repo owner="neogeek" name="build-unity-android-plugin" description="🔧 Build Android plugins for Unity without needing to setup an Android project." iconUrl="/images/avatars/neogeek.png"></github-repo>
</div>

I even open sourced my poker logic as a C# only library.

<div class="repos">
  <github-repo owner="neogeek" name="PokerSharp" description="PokerSharp is a small poker hand evaluation library." iconUrl="/images/avatars/neogeek.png"></github-repo>
</div>

This process took years. And because I found excitement in releasing open source packages, I started to lose interest in the reason I started down this path in the first place.

Within the first year of development, I rekindled my interest in the game after demoing it at a local game showcase called BostonFIG.

<div class="youtube-video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/3MRXPp0izLE"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

<div class="images">
  <figure>
    <img src="/images/the-simple-game-that-took-me-6-years-to-release/boston-fig-1.jpg" alt="Picture of me standing at my booth at BostonFIG." />
    <figcaption>Picture of me standing at my booth at BostonFIG 2018.</figcaption>
  </figure>
  <figure>
    <img src="/images/the-simple-game-that-took-me-6-years-to-release/boston-fig-2.jpg" alt="Picture of a table with two iPads, one with Flip Jacks the game on it and another with a newsletter sign up form. A TV is behind the iPads with the iPad showing Flip Jacks on the screen. There are also a bunch of playing cards and poker chips on the table." />
    <figcaption>Close up shot of the booth at BostonFIG 2018.</figcaption>
  </figure>
</div>

Unfortunately, even that didn't motivate me enough to finish and release it.

Another issue that contributed to my not releasing the game earlier was that I wasn't marketing my game. Because of this, I had no outside accountability aside from myself and people I knew personally. This was a massive factor in my not releasing the game earlier.

But in the end, I finally released it. I'm happy I did, and I'm proud of my work.

Will I market it now that it's out? Probably not. It was, first and foremost, a passion project, but it was also a way for me to learn Unity. Maybe I'll market my next game before it comes out in six years.

Am I making a new game? I am! It's a rhythm game like Guitar Hero or Rock Band, and as is tradition, I'm building an [open source library](https://github.com/neogeek/rhythm-game-utilities) first. Because of course I am.

Wait, before you go, I should probably share the link to the game I've been talking about right?

<div style="margin: 3rem 0; text-align: center;">
  <div>
    <a href="https://flipjacksgame.com">
      <img src="/images/the-simple-game-that-took-me-6-years-to-release/thumbnail.png" width="600" style="margin: 1.5rem 0; border-radius: 1rem; filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));">
    </a>
  </div>
  <a href="https://flipjacksgame.com">flipjacksgame.com</a>
</div>
