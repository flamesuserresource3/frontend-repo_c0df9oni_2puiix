import HeroScene from './components/HeroScene';
import ChapterAscent from './components/ChapterAscent';
import ProjectGlove from './components/ProjectGlove';
import HorizonAndReflection from './components/HorizonAndReflection';

function App() {
  return (
    <main className="bg-[#0b0e16] text-white selection:bg-violet-500/30 selection:text-white">
      <HeroScene />
      <ChapterAscent />
      <ProjectGlove />
      <HorizonAndReflection />
    </main>
  );
}

export default App;
