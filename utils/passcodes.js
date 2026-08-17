function normalizePasscode(value) {
    let normalized = String(value ?? "").trim().normalize("NFKC")

    const hasMatchingQuotes =
        (normalized.startsWith('"') && normalized.endsWith('"')) ||
        (normalized.startsWith("'") && normalized.endsWith("'"))

    if (hasMatchingQuotes && normalized.length >= 2) {
        normalized = normalized.slice(1, -1).trim()
    }

    return normalized
}

function getConfiguredPasscodes() {
    return {
        memberPasscode: normalizePasscode(process.env.PASSCODE),
        adminPasscode: normalizePasscode(process.env.ADMIN_PASSCODE)
    }
}

module.exports = { normalizePasscode, getConfiguredPasscodes }
