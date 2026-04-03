const SKILL_GROUPS = [
  {
    category: '언어',
    items: ['Java', 'Python'],
  },
  {
    category: '백엔드',
    items: ['Spring Boot', 'JPA', 'MySQL'],
  },
  {
    category: '클라우드 & 인프라',
    items: ['AWS EC2', 'AWS RDS', 'AWS S3', 'Docker'],
  },
  {
    category: 'CI/CD',
    items: ['GitHub Actions'],
  },
  {
    category: '도구',
    items: ['IntelliJ IDEA', 'Visual Studio Code', 'MySQL Workbench', 'Git / GitHub', 'Notion'],
  },
]

export default function Skill() {
  return (
    <div className="flex flex-col items-center px-5 py-16 font-['DM_Sans',sans-serif]">
      <div className="w-full max-w-160">

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-['Instrument_Serif',serif] text-[52px] leading-[1.05] tracking-[-1.5px] text-neutral-900 font-normal mb-3">
            기술 스택
          </h1>
          <p className="text-[15px] text-neutral-500 tracking-[-0.2px]">Tech Stack</p>
        </div>

        {/* Skill Groups */}
        <div className="flex flex-col gap-10">
          {SKILL_GROUPS.map((group, i) => (
            <section key={i}>
              <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-4">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 border border-neutral-200 text-[13px] text-neutral-700 tracking-[-0.1px] bg-white"
                    style={{ borderRadius: '3px' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {i < SKILL_GROUPS.length - 1 && (
                <div className="border-t border-neutral-100 mt-10" />
              )}
            </section>
          ))}
        </div>

      </div>
    </div>
  )
}
