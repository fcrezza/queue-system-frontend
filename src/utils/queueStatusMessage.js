function generateStatusMessage(id, activeQueueID, queue) {
  const indexInQueue = queue.indexOf(queue.find((q) => q.id === id))
  let message = ''

  if (activeQueueID === id) {
    message = 'Sedang bimbingan'
  } else if (activeQueueID !== id && indexInQueue !== 0) {
    message = `Menunggu ${indexInQueue} antrian`
  } else {
    message = 'Menunggu dipanggil'
  }

  return message
}

export default generateStatusMessage
