import { useEffect, useRef, useState } from 'react';
import TodoBoard from '../todo/TodoBoard';

const tabs = [
  { key: 'home' },
  { key: 'todo' },
];

export default function HomePage({ initialTab = 'home' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const slideRefs = useRef({ home: null, todo: null });

  useEffect(() => {
    const target = slideRefs.current[activeTab];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [activeTab]);

  const goToTab = (direction) => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % tabs.length
      : (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex].key);
  };

  return (
    <main className="relative z-10 h-screen overflow-hidden bg-transparent text-white">
      <div className="relative z-10 h-full w-full bg-transparent">
        {activeTab === 'todo' && (
          <button
            type="button"
            aria-label="Previous tab"
            onClick={() => goToTab('prev')}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-3xl text-white/80 transition hover:border-white/20 hover:text-white"
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}

        {activeTab === 'home' && (
          <button
            type="button"
            aria-label="Next tab"
            onClick={() => goToTab('next')}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-3xl text-white/80 transition hover:border-white/20 hover:text-white"
          >
            <span aria-hidden="true">›</span>
          </button>
        )}

        <div className="relative h-full w-full overflow-hidden bg-transparent">
          <div className="relative h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
            <div className="flex h-full min-w-full">
              <section ref={(node) => { slideRefs.current.home = node; }} className="h-full min-w-full snap-start py-3 md:py-5">
                <div className="flex h-full items-stretch gap-4 px-0 md:px-2 lg:px-4">
                  <div className="w-full md:w-[42%] lg:w-[40%]">
                    <div className="glass h-full rounded-[26px]">
                      <div className="flex h-full flex-col justify-center px-3 pt-6 pb-6 md:px-6 lg:px-8">
                        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
                          About me
                        </div>

                        <div className="shrink-0">
                          <h1 className="mb-3 text-[1.9rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-[2.3rem] md:text-[2.7rem] lg:text-[3.1rem]">
                            Puttamraju Sai Manaswi
                          </h1>
                          <div className="mb-4 text-xl font-medium tracking-[-0.04em] text-white/90 md:text-2xl">
                            Associate Software Engineer
                          </div>
                          <div className="mb-6 flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Python', 'Flutter', 'FastAPI'].map((tag) => (
                              <span key={tag} className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] text-white/75">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto pr-2 scrollbar-hidden">
                          <div className="space-y-4">
                            <p className="max-w-4xl text-sm leading-7 text-white/75 md:text-base lg:text-lg">
                              I’m a software engineer based in Hyderabad, working across React.js, TypeScript, Python, Flutter, FastAPI, and full-stack product development.
                            </p>
                            <p className="max-w-4xl text-sm leading-7 text-white/75 md:text-base lg:text-lg">
                              My work focuses on building scalable interfaces and backend systems for HRMS and business tooling, with attention to usability, architecture, and clean implementation.
                            </p>
                            <p className="max-w-4xl text-sm leading-7 text-white/75 md:text-base lg:text-lg">
                              I’ve also built timesheet tools, tax workflows, AI experiments, and mobile experiences, and I enjoy turning practical ideas into polished digital products.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" aria-hidden="true" />
                </div>
              </section>

              <section ref={(node) => { slideRefs.current.todo = node; }} className="h-full min-w-full snap-start">
                <div className="h-full px-3 pt-6 pb-6 md:px-6 lg:px-8">
                  <TodoBoard />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
