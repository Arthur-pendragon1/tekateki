let flippedCards = [false, false, false];
let gameActive = true;

// Default recipient phone number (international, no plus sign). Change as needed.
const recipientPhone = '6285736055388';

function flipCard(cardNumber) {
    if (!gameActive || flippedCards[cardNumber - 1]) return; // Prevent flipping if game over or already flipped

    const card = document.getElementById('card' + cardNumber);
    const back = document.getElementById('back' + cardNumber);

    const hadiah = [
        { nominal: "Rp 10.000", weight: 40 },
        { nominal: "Rp 20.000", weight: 25 },
        { nominal: "Rp 30.000", weight: 15 },
        { nominal: "Rp 40.000", weight: 10 },
        { nominal: "Rp 50.000", weight: 10 },
        { nominal: "Rp 100.000", weight: 2 },
    ];

    let totalWeight = hadiah.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    let selectedHadiah;
    for (let item of hadiah) {
        if (random < item.weight) {
            selectedHadiah = item.nominal;
            break;
        }
        random -= item.weight;
    }

    back.innerHTML = selectedHadiah;
    card.classList.add('flipped');
    flippedCards[cardNumber - 1] = true;

    // Disable all cards after flip
    gameActive = false;
    for (let i = 1; i <= 3; i++) {
        if (!flippedCards[i - 1]) {
            document.getElementById('card' + i).classList.add('disabled');
        }
    }

    // Show modal after a short delay
    setTimeout(() => {
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.innerHTML = "🎉 Selamat! Kamu mendapatkan <br><b>" + selectedHadiah + "</b>";
        document.getElementById("myModal").style.display = "block";
        // Update instruction text
        document.querySelector('p').innerHTML = "Permainan selesai. Refresh halaman untuk bermain lagi.";

        // Prepare phone display and WhatsApp prefilled message
        const modalPhone = document.getElementById('modalPhone');
        modalPhone.textContent = 'Nomor tujuan: +' + recipientPhone;

        const exampleMessage = `Halo, saya mendapatkan ${selectedHadiah} dari Tebak Kartu THR. Mohon informasi lebih lanjut.`;
        const sampleEl = document.getElementById('sampleText');
        if (sampleEl) sampleEl.textContent = 'Tekan tombol untuk konfirmasi ke pemilik web';

        const sendBtn = document.getElementById('sendWhatsApp');
        if (sendBtn) sendBtn.href = 'https://wa.me/' + recipientPhone + '?text=' + encodeURIComponent(exampleMessage);
    }, 600);
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}