// Lead service for handling form submissions
export interface LeadData {
  services: string[]
  businessType: string
  budget: string
  name: string
  email: string
  phone: string
  businessName: string
  currentWebsite: string
  goals: string
  timeline: string
  preferredContact: string
}

export interface SubmitLeadResult {
  success: boolean
  leadId?: string
  message?: string
}

export const submitLead = async (leadData: LeadData): Promise<SubmitLeadResult> => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a unique lead ID
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store lead data in localStorage for now (in production, this would go to a database)
    const existingLeads = JSON.parse(localStorage.getItem("vifa_leads") || "[]")
    const newLead = {
      id: leadId,
      ...leadData,
      submittedAt: new Date().toISOString(),
      status: "new",
    }

    existingLeads.push(newLead)
    localStorage.setItem("vifa_leads", JSON.stringify(existingLeads))

    // Log for debugging
    console.log("[v0] Lead submitted successfully:", {
      leadId,
      services: leadData.services,
      businessType: leadData.businessType,
      budget: leadData.budget,
      name: leadData.name,
      email: leadData.email,
      businessName: leadData.businessName,
    })

    return {
      success: true,
      leadId,
      message: "შეკვეთა წარმატებით გაიგზავნა!",
    }
  } catch (error) {
    console.error("[v0] Error submitting lead:", error)

    return {
      success: false,
      message: "შეცდომა მოხდა. გთხოვთ კიდევ სცადოთ.",
    }
  }
}

// Function to get all leads (for admin dashboard)
export const getLeads = (): Array<LeadData & { id: string; submittedAt: string; status: string }> => {
  try {
    return JSON.parse(localStorage.getItem("vifa_leads") || "[]")
  } catch (error) {
    console.error("[v0] Error getting leads:", error)
    return []
  }
}

// Function to update lead status
export const updateLeadStatus = (leadId: string, status: string): boolean => {
  try {
    const leads = getLeads()
    const leadIndex = leads.findIndex((lead) => lead.id === leadId)

    if (leadIndex !== -1) {
      leads[leadIndex].status = status
      localStorage.setItem("vifa_leads", JSON.stringify(leads))
      console.log("[v0] Lead status updated:", { leadId, status })
      return true
    }

    return false
  } catch (error) {
    console.error("[v0] Error updating lead status:", error)
    return false
  }
}
