import React from "react";

/**
 * PoliciesInfoDiv Component
 * Renders hierarchical policy information with multiple nesting levels
 * 
 *  props
 *  props.sections - Array of main policy sections
 * 
 *  MainSection
 *  title - Main section title
 *  [description] - Optional main section description
 *  [content] - Array of subsections
 * 
 *  Section
 *  [sectionTitle] - Section title
 *  [items] - Bullet points
 *  [descriptionTwo] - Additional description
 *  [subsections] - Nested subsections
 *  [text] - Text-based subsections
 * 
 *  Subsection
 *  subtitle - Subsection title
 *  items - Bullet points
 * 
 *  TextSection
 *  subtitle - Text section title
 *  content - Text content
 */

const PoliciesInfoDiv = ({ sections }) => {
  return (
    <div className="text-white min-h-screen my-24">
      <div className="max-w-6xl xl:mx-w-7xl 2xl:max-w-full mx-8 lg:mx-20 xl:mx-36">
        {sections.map((mainSection, mainIndex) => (
          <div key={mainIndex} className="mb-8">
            {/* Main section header */}
            <h1 className="text-xl xl:text-2xl font-bold mb-6">{mainSection.title}</h1>
            {mainSection.description && <p className="mb-4">{mainSection.description}</p>}

            {/* Content sections */}
            {mainSection.content &&
              mainSection.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {/* Section title with bullet decoration */}
                  {section.sectionTitle && (
                    <h2 className="text-lg xs:text-xl font-semibold mb-2 flex items-center">
                      <span className="w-3 h-3 border-2 border-white rounded-full inline-block mr-2"></span>
                      {section.sectionTitle}
                    </h2>
                  )}

                  {/* Bullet point list */}
                  {section.items && (
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      {section.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.descriptionTwo && <p className="mb-4 mt-4">{section.descriptionTwo}</p>}

                  {/* Nested subsections */}
                  {section.subsections &&
                    section.subsections.map((sub, subIdx) => (
                      <div key={subIdx} className="mb-8">
                        <h3 className="text-base xs:text-lg font-medium mb-1 flex items-center">
                          <span className="w-3 h-3 border-2 border-white rounded-full inline-block mr-2"></span>
                          {sub.subtitle}
                        </h3>
                        <ul className="list-disc list-inside ml-6 space-y-1">
                          {sub.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                  {/* Text sections */}
                  {section.text &&
                    section.text.map((textSection, textIdx) => (
                      <div key={textIdx} className="mb-8">
                        <h3 className="text-xl xl:text-2xl font-bold mb-1">
                          {textSection.subtitle}
                        </h3>
                        <p>{textSection.content}</p>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesInfoDiv;



