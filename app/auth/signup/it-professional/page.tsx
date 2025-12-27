"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Trash2, Upload } from "lucide-react";

type JobType = "Full-time" | "Remote" | "Hybrid";
type RoleType = "Full-time" | "Internship" | "Contract";

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  score: string;
}

interface Experience {
  id: string;
  company: string;
  designation: string;
  roleType: RoleType;
  startDate: string;
  endDate: string;
  responsibilities: string;
  techStack: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  duration: string;
}

export default function ITOnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    // If user came here directly, force correct flow
    const hasCompletedDetails = sessionStorage.getItem("signup-details-complete");

    if (!hasCompletedDetails) {
      router.replace("/auth/signup/");
    }
  }, [router]);


  const [currentSection, setCurrentSection] = useState(1);

  // Section 1: Basic Profile
  const [fullName, setFullName] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  // Section 2: Career Preferences
  const [targetRole, setTargetRole] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [jobTypePreferences, setJobTypePreferences] = useState<JobType[]>([]);
  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);
  const [currentCTC, setCurrentCTC] = useState("");
  const [expectedCTC, setExpectedCTC] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});


  // Section 3: Education
  const [educations, setEducations] = useState<Education[]>([
    {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      graduationYear: "",
      score: "",
    },
  ]);

  // Section 4: Experience
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [experienceTechInput, setExperienceTechInput] = useState<Record<string, string>>({});

  // Section 5: Skills
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [skillInputs, setSkillInputs] = useState({
    technical: "",
    tools: "",
    frameworks: "",
    domains: "",
    soft: "",
  });

  // Section 6: Projects & Online Presence
  const [projects, setProjects] = useState<Project[]>([
    {
      id: Date.now().toString(),
      title: "",
      description: "",
      role: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
      duration: "",
    },
  ]);
  const [projectTechInput, setProjectTechInput] = useState<Record<string, string>>({});
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const clearError = (key: string) => {
    setErrors((prev) => {
        if (!prev[key]) return prev;
        const updated = { ...prev };
        delete updated[key];
        return updated;
    });
  };

  const validateSection1 = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!currentLocation.trim()) newErrors.currentLocation = "Current location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSection2 = () => {
    const newErrors: Record<string, string> = {};

    if (!targetRole.trim()) newErrors.targetRole = "Target role is required";
    if (!careerGoal.trim()) newErrors.careerGoal = "Career goal summary is required";
    if (jobTypePreferences.length === 0)
        newErrors.jobTypePreferences = "Select at least one job type";
    if (preferredLocations.length === 0)
        newErrors.preferredLocations = "Add at least one preferred location";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSection3 = () => {
    const newErrors: Record<string, string> = {};

    educations.forEach((edu, index) => {
        if (!edu.institution.trim())
        newErrors[`education-${index}-institution`] = "Institution is required";
        if (!edu.degree.trim())
        newErrors[`education-${index}-degree`] = "Degree is required";
        if (!edu.fieldOfStudy.trim())
        newErrors[`education-${index}-field`] = "Field of study is required";
        if (!edu.graduationYear.trim())
        newErrors[`education-${index}-year`] = "Graduation year is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSection4 = () => {
    const newErrors: Record<string, string> = {};

    experiences.forEach((exp, index) => {
        if (!exp.company.trim())
        newErrors[`exp-${index}-company`] = "Company name is required";
        if (!exp.designation.trim())
        newErrors[`exp-${index}-designation`] = "Designation is required";
        if (!exp.startDate)
        newErrors[`exp-${index}-start`] = "Start date is required";
        if (!exp.responsibilities.trim())
        newErrors[`exp-${index}-responsibilities`] = "Responsibilities are required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSection5 = () => {
    const newErrors: Record<string, string> = {};

    if (
        technicalSkills.length === 0 &&
        tools.length === 0 &&
        frameworks.length === 0
    ) {
        newErrors.skills = "Add at least one technical skill, tool, or framework";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSection6 = () => {
    setErrors({});
    return true;
  };

  // Job type toggle
  const toggleJobType = (type: JobType) => {
    setJobTypePreferences((prev) =>
        prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
    clearError("jobTypePreferences");
  };

  // Tag input handlers
  const addLocationTag = () => {
    if (locationInput.trim()) {
        setPreferredLocations([...preferredLocations, locationInput.trim()]);
        setLocationInput("");
        clearError("preferredLocations");
    }
  };


  const removeLocationTag = (location: string) => {
    setPreferredLocations(preferredLocations.filter((l) => l !== location));
  };

  const addSkillTag = (type: keyof typeof skillInputs, setter: (skills: string[]) => void, current: string[]) => {
    const value = skillInputs[type].trim();
    if (value && !current.includes(value)) {
      setter([...current, value]);
      setSkillInputs({ ...skillInputs, [type]: "" });
    }
    clearError("skills");
  };

  const removeSkillTag = (type: string, skill: string, setter: (skills: string[]) => void, current: string[]) => {
    setter(current.filter((s) => s !== skill));
  };

  // Education handlers
  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        institution: "",
        degree: "",
        fieldOfStudy: "",
        graduationYear: "",
        score: "",
      },
    ]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter((edu) => edu.id !== id));
    }
  };

  // Experience handlers
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        company: "",
        designation: "",
        roleType: "Full-time",
        startDate: "",
        endDate: "",
        responsibilities: "",
        techStack: [],
      },
    ]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)));
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 0) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  const addExperienceTech = (id: string) => {
    const input = experienceTechInput[id]?.trim();
    if (input) {
      const exp = experiences.find((e) => e.id === id);
      if (exp && !exp.techStack.includes(input)) {
        updateExperience(id, "techStack", [...exp.techStack, input]);
        setExperienceTechInput({ ...experienceTechInput, [id]: "" });
      }
    }
  };

  const removeExperienceTech = (expId: string, tech: string) => {
    const exp = experiences.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, "techStack", exp.techStack.filter((t) => t !== tech));
    }
  };

  // Project handlers
  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        role: "",
        techStack: [],
        githubUrl: "",
        liveUrl: "",
        duration: "",
      },
    ]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)));
  };

  const removeProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(projects.filter((proj) => proj.id !== id));
    }
  };

  const addProjectTech = (id: string) => {
    const input = projectTechInput[id]?.trim();
    if (input) {
      const proj = projects.find((p) => p.id === id);
      if (proj && !proj.techStack.includes(input)) {
        updateProject(id, "techStack", [...proj.techStack, input]);
        setProjectTechInput({ ...projectTechInput, [id]: "" });
      }
    }
  };

  const removeProjectTech = (projId: string, tech: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, "techStack", proj.techStack.filter((t) => t !== tech));
    }
  };

  const handleNext = () => {
    let isValid = false;

    switch (currentSection) {
        case 1:
        isValid = validateSection1();
        break;
        case 2:
        isValid = validateSection2();
        break;
        case 3:
        isValid = validateSection3();
        break;
        case 4:
        isValid = validateSection4();
        break;
        case 5:
        isValid = validateSection5();
        break;
        default:
        isValid = true;
    }

    if (!isValid) return;

    setErrors({});
    setCurrentSection((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleComplete = () => {
    console.log("Profile completed", {
      basicProfile: { fullName, currentLocation },
      careerPreferences: {
        targetRole,
        careerGoal,
        jobTypePreferences,
        preferredLocations,
        currentCTC,
        expectedCTC,
      },
      educations,
      experiences,
      skills: { technicalSkills, tools, frameworks, domains, softSkills },
      projects,
      onlinePresence: { linkedinUrl, githubUrl, portfolioUrl, blogUrl },
      resume: resumeFile,
    });
    // Navigate to dashboard or next step
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-600 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">MYTA</h2>

          <button
            onClick={() => router.push("/auth/login")}
            className="flex items-center gap-1 text-white font-semibold underline hover:text-purple-200 transition-colors"
          >
            <X className="w-5 h-5" />
            Exit
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentSection} of 6</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    step === currentSection
                      ? "bg-purple-600"
                      : step < currentSection
                      ? "bg-purple-300"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: Basic Profile */}
        {currentSection === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-opacity duration-300">
            <h1 className="mb-6 text-3xl md:text-xl font-semibold text-gray-900">Basic Information</h1>
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block mb-2 text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                        setFullName(e.target.value);
                        clearError("fullName");
                    }}
                  className="w-full px-4 py-2.5 bg-gray-50 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                    <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                )}

              </div>
              <div>
                <label htmlFor="location" className="block mb-2 text-gray-700">
                  Current Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={currentLocation}
                  onChange={(e) => {
                    setCurrentLocation(e.target.value);
                    clearError("currentLocation");
                    }}

                  className="w-full px-4 py-2.5 bg-gray-50 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="City, Country"
                />
                {errors.currentLocation && (
                    <p className="text-sm text-red-600 mt-1">{errors.currentLocation}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Career Preferences */}
        {currentSection === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-opacity duration-300">
            <h1 className="mb-6 text-3xl md:text-xl font-semibold text-gray-900">Career Preferences</h1>
            <div className="space-y-6">
              <div>
                <label htmlFor="targetRole" className="block mb-2 text-gray-700">
                  Target Role
                </label>
                <input
                  id="targetRole"
                  type="text"
                  value={targetRole}
                  onChange={(e) => {
                    setTargetRole(e.target.value);
                    clearError("targetRole");
                    }}

                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="e.g., Senior Software Engineer"
                />
                {errors.targetRole && (
                    <p className="text-sm text-red-600 mt-1">{errors.targetRole}</p>
                )}
              </div>
              <div>
                <label htmlFor="careerGoal" className="block mb-2 text-gray-700">
                  Career Goal Summary
                </label>
                <textarea
                  id="careerGoal"
                  value={careerGoal}
                  onChange={(e) => {
                    setCareerGoal(e.target.value);
                    clearError("careerGoal");
                    }}

                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Describe your career goals and aspirations"
                />
                {errors.careerGoal && (
                    <p className="text-sm text-red-600 mt-1">{errors.careerGoal}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Job Type Preference</label>
                <div className="flex flex-wrap gap-3">
                  {(["Full-time", "Contract", "Remote", "Hybrid"] as JobType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleJobType(type)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        jobTypePreferences.includes(type)
                          ? "bg-purple-100 border-purple-500 text-purple-700"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                {errors.jobTypePreferences && (
                  <p className="text-sm text-red-600 mt-3">{errors.jobTypePreferences}</p>
                )}
                </div>
              </div>
              <div>
                <label htmlFor="preferredLocations" className="block mb-2 text-gray-700">
                  Preferred Locations
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    id="preferredLocations"
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocationTag())}
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Type and press Enter"
                  />
                  {errors.preferredLocations && (
                    <p className="text-sm text-red-600 mt-3">{errors.preferredLocations}</p>
                  )}
                  <button
                    type="button"
                    onClick={addLocationTag}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferredLocations.map((location) => (
                    <span
                      key={location}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {location}
                      <button
                        type="button"
                        onClick={() => removeLocationTag(location)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="currentCTC" className="block mb-2 text-gray-700">
                    Current CTC (optional)
                  </label>
                  <input
                    id="currentCTC"
                    type="number"
                    value={currentCTC}
                    onChange={(e) => setCurrentCTC(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Annual in your currency"
                  />
                </div>
                <div>
                  <label htmlFor="expectedCTC" className="block mb-2 text-gray-700">
                    Expected CTC (optional)
                  </label>
                  <input
                    id="expectedCTC"
                    type="number"
                    value={expectedCTC}
                    onChange={(e) => setExpectedCTC(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Annual in your currency"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Education */}
        {currentSection === 3 && (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-opacity duration-300">
            <h1 className="mb-6 text-3xl md:text-xl font-semibold text-gray-900">Education</h1>
            <div className="space-y-6">
              {educations.map((edu, index) => (
                <div key={edu.id} className="p-6 text-gray-900 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-700">Education {index + 1}</h4>
                    {educations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">Institution Name</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        updateEducation(edu.id, "institution", e.target.value);
                        clearError(`education-${index}-institution`);
                        }}

                      className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="University or College name"
                    />
                    {errors[`education-${index}-institution`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`education-${index}-institution`]}
                        </p>
                    )}

                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="e.g., Bachelor's, Master's"
                      />
                      {errors[`education-${index}-degree`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`education-${index}-degree`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">Field of Study</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="e.g., Computer Science"
                      />
                      {errors[`education-${index}-field`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`education-${index}-field`]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">Graduation Year</label>
                      <input
                        type="number"
                        value={edu.graduationYear}
                        onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="YYYY"
                      />
                      {errors[`education-${index}-year`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`education-${index}-year`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">Score / Percentage (optional)</label>
                      <input
                        type="text"
                        value={edu.score}
                        onChange={(e) => updateEducation(edu.id, "score", e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="e.g., 8.5 GPA or 85%"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add another education
              </button>
            </div>
          </div>
        )}

        {/* Section 4: Experience */}
        {currentSection === 4 && (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-opacity duration-300">
            <h1 className="mb-6 text-3xl md:text-xl font-semibold text-gray-900">Work Experience</h1>
            <div className="space-y-6">
            <div className="space-y-6">
                {experiences.length === 0 && (
                    <button
                    type="button"
                    onClick={addExperience}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                    >
                    <Plus className="w-5 h-5" />
                    Add experience
                    </button>
                )}
              {experiences.map((exp, index) => (
                <div key={exp.id} className="p-6 text-gray-900 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-700">Experience {index + 1}</h4>
                    {experiences.length > 0 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                            updateExperience(exp.id, "company", e.target.value);
                            clearError(`experience-${index}-company`);
                            }}

                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Company name"
                      />
                      {errors[`exp-${index}-company`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`exp-${index}-company`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">Designation</label>
                      <input
                        type="text"
                        value={exp.designation}
                        onChange={(e) => updateExperience(exp.id, "designation", e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your role"
                      />
                      {errors[`exp-${index}-designation`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`exp-${index}-designation`]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">Role Type</label>
                    <div className="flex gap-3">
                      {(["Full-time", "Internship", "Contract"] as RoleType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateExperience(exp.id, "roleType", type)}
                          className={`px-4 py-2 rounded-lg text-gray-900 border-2 transition-colors ${
                            exp.roleType === type
                              ? "bg-purple-100 border-purple-500 text-purple-700"
                              : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      />
                      {errors[`exp-${index}-startDate`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`exp-${index}-startDate`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700 text-sm">End Date (optional)</label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">Responsibilities Summary</label>
                    <textarea
                      value={exp.responsibilities}
                      onChange={(e) => updateExperience(exp.id, "responsibilities", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      placeholder="Describe your key responsibilities and achievements"
                    />
                    {errors[`exp-${index}-responsibilities`] && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors[`exp-${index}-responsibilities`]}
                        </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">Tech Stack Used</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={experienceTechInput[exp.id] || ""}
                        onChange={(e) =>
                          setExperienceTechInput({ ...experienceTechInput, [exp.id]: e.target.value })
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addExperienceTech(exp.id))
                        }
                        className="flex-1 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Type and press Enter"
                      />
                      <button
                        type="button"
                        onClick={() => addExperienceTech(exp.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeExperienceTech(exp.id, tech)}
                            className="hover:text-purple-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {experiences.length > 0 && (
                <button
                    type="button"
                    onClick={addExperience}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                    >
                    <Plus className="w-5 h-5" />
                    Add another experience
                    </button>
              )}
            </div>
            </div>
          </div>
        )}

        {/* Section 5: Skills */}
        {currentSection === 5 && (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-opacity duration-300">
            <h1 className="mb-1 text-3xl md:text-xl font-semibold text-gray-900">
                Skills
            </h1>
            <h5 className="mb-4 text-sm text-gray-600">
                (Add at least one type)
            </h5>

            <div className="space-y-6">
              {/* Technical Skills */}
              <div>
                <label className="block mb-2 text-gray-700">Technical Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInputs.technical}
                    onChange={(e) => setSkillInputs({ ...skillInputs, technical: e.target.value })}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addSkillTag("technical", setTechnicalSkills, technicalSkills))
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g., Python, JavaScript"
                  />
                  {errors.skills && (
                    <p className="mt-3 text-sm text-red-600">{errors.skills}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => addSkillTag("technical", setTechnicalSkills, technicalSkills)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkillTag("technical", skill, setTechnicalSkills, technicalSkills)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <label className="block mb-2 text-gray-700">Tools</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInputs.tools}
                    onChange={(e) => setSkillInputs({ ...skillInputs, tools: e.target.value })}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkillTag("tools", setTools, tools))
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g., Docker, Git"
                  />
                  {errors.skills && (
                    <p className="mt-3 text-sm text-red-600">{errors.skills}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => addSkillTag("tools", setTools, tools)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {tool}
                      <button
                        type="button"
                        onClick={() => removeSkillTag("tools", tool, setTools, tools)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <label className="block mb-2 text-gray-700">Frameworks</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInputs.frameworks}
                    onChange={(e) => setSkillInputs({ ...skillInputs, frameworks: e.target.value })}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addSkillTag("frameworks", setFrameworks, frameworks))
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g., React, Django"
                  />
                  {errors.skills && (
                    <p className="mt-3 text-sm text-red-600">{errors.skills}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => addSkillTag("frameworks", setFrameworks, frameworks)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map((framework) => (
                    <span
                      key={framework}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {framework}
                      <button
                        type="button"
                        onClick={() => removeSkillTag("frameworks", framework, setFrameworks, frameworks)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Domains */}
              <div>
                <label className="block mb-2 text-gray-700">Domains</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInputs.domains}
                    onChange={(e) => setSkillInputs({ ...skillInputs, domains: e.target.value })}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkillTag("domains", setDomains, domains))
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g., Machine Learning, Cloud Computing"
                  />
                  {errors.skills && (
                    <p className="mt-3 text-sm text-red-600">{errors.skills}</p>
                  )}

                  <button
                    type="button"
                    onClick={() => addSkillTag("domains", setDomains, domains)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <span
                      key={domain}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {domain}
                      <button
                        type="button"
                        onClick={() => removeSkillTag("domains", domain, setDomains, domains)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <label className="block mb-2 text-gray-700">Soft Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInputs.soft}
                    onChange={(e) => setSkillInputs({ ...skillInputs, soft: e.target.value })}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkillTag("soft", setSoftSkills, softSkills))
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g., Leadership, Communication"
                  />
                  {errors.skills && (
                    <p className="mt-3 text-sm text-red-600">{errors.skills}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => addSkillTag("soft", setSoftSkills, softSkills)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkillTag("soft", skill, setSoftSkills, softSkills)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 6: Projects & Online Presence */}
        {currentSection === 6 && (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-opacity duration-300">
            <h1 className="mb-6 text-3xl md:text-xl font-semibold text-gray-900">Projects & Online Presence</h1>
            <div className="space-y-8">
              {/* Projects */}
              <div>
                <h3 className="mb-4 text-gray-700">Projects</h3>
                <div className="space-y-6">
                  {projects.map((proj, index) => (
                    <div key={proj.id} className="p-6 text-gray-900 border border-gray-200 rounded-lg space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-700">Project {index + 1}</h4>
                        {projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProject(proj.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 text-gray-700 text-sm">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Project name"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-gray-700 text-sm">Your Role</label>
                          <input
                            type="text"
                            value={proj.role}
                            onChange={(e) => updateProject(proj.id, "role", e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="e.g., Lead Developer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700 text-sm">Description</label>
                        <textarea
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                          placeholder="Describe the project"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700 text-sm">Tech Stack</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={projectTechInput[proj.id] || ""}
                            onChange={(e) =>
                              setProjectTechInput({ ...projectTechInput, [proj.id]: e.target.value })
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" && (e.preventDefault(), addProjectTech(proj.id))
                            }
                            className="flex-1 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Type and press Enter"
                          />
                          <button
                            type="button"
                            onClick={() => addProjectTech(proj.id)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                            >
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeProjectTech(proj.id, tech)}
                                className="hover:text-purple-900"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block mb-2 text-gray-700 text-sm">Duration</label>
                          <input
                            type="text"
                            value={proj.duration}
                            onChange={(e) => updateProject(proj.id, "duration", e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="e.g., 3 months"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-gray-700 text-sm">GitHub URL (optional)</label>
                          <input
                            type="url"
                            value={proj.githubUrl}
                            onChange={(e) => updateProject(proj.id, "githubUrl", e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-gray-700 text-sm">Live URL (optional)</label>
                          <input
                            type="url"
                            value={proj.liveUrl}
                            onChange={(e) => updateProject(proj.id, "liveUrl", e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addProject}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add another project
                  </button>
                </div>
              </div>

              {/* Online Presence */}
              <div>
                <h3 className="mb-4 text-gray-700">Online Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">LinkedIn URL</label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">GitHub URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">Portfolio URL</label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">Blog URL</label>
                    <input
                      type="url"
                      value={blogUrl}
                      onChange={(e) => setBlogUrl(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="https://yourblog.com"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h3 className="mb-4 text-gray-700">Resume</h3>
                <div>
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center w-full px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-600">
                        {resumeFile ? resumeFile.name : "Upload Resume (optional)"}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</span>
                    </div>
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          {currentSection > 1 ? (
            <button
              onClick={handleBack}
              className="px-6 py-2.5 text-purple-600 hover:text-purple-700 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          {currentSection < 6 ? (
            <button
              onClick={handleNext}
              className="px-8 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-8 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors ml-auto"
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
