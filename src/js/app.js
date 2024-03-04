// Home page
const app = document.getElementById("app");
const apiUrl = "https://liukabu-backend-production.up.railway.app";

async function loadAndApplyMeta() {
  try {
    const response = await fetch(`${apiUrl}/api/metas?populate=*`);
    if (!response.ok) throw new Error('Network response was not ok for meta data');
    const metaData = await response.json();

    // Create meta HTML string (including title, description, open graph, etc.)
    const metaHTML = createMetaHTML(metaData.data);
    document.head.insertAdjacentHTML('beforeend', metaHTML);
  } catch (error) {
    console.error("Failed to fetch meta data:", error);
  }
}

// Async function to fetch home page data
const fetchAndUpdateHomePage = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/home-page?populate=*`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Fetch banners data
        // const metaResponse = await fetch(`${apiUrl}/api/metas?populate=*`);
        // if (!metaResponse.ok) throw new Error('Network response was not ok for meta data');
        // const metaData = await metaResponse.json();

        // Fetch banners data
        const bannersResponse = await fetch(`${apiUrl}/api/banners?populate=*&sort=button`);
        if (!bannersResponse.ok) throw new Error('Network response was not ok for banners');
        const bannersData = await bannersResponse.json();

        
        // Extract needed data from the response
        const attributes = data.data.attributes;
        
        // Assuming you have predefined methods to construct HTML for each section
        // const metaHTML = constructMetaHTML(metaData.data)
        const headerHTML = constructHeaderHTML(attributes.cover.data.attributes)
        const bannersHTML = constructBannersHTML(bannersData.data);
        const pitchHTML = constructPitchHTML(attributes);
        const iframeHTML = constructIframeHTML(attributes.youtubeLink);
        const galleryHTML = constructGalleryHTML(attributes.galleryImages);
        const formHTML = constructFormHTML(attributes);
        const footerHTML = constructFooterHTML(attributes.socialLinks);
        
        // Dynamically update specific sections
        // Note: This assumes you have placeholders or containers for these sections in your HTML
        // document.head.innerHTML += metaHTML;
        app.innerHTML += headerHTML;
        app.innerHTML += bannersHTML;
        app.innerHTML += pitchHTML;
        app.innerHTML += iframeHTML;
        app.innerHTML += galleryHTML;
        app.innerHTML += formHTML;
        app.innerHTML += footerHTML;

         // Now that iframe is added to the DOM, initialize it
         const { initIframe } = await import('./iframe.js');
         initIframe(attributes.iframeUrl); // Adjust based on actual structure

         // Note: The banners section remains unchanged, as it's not dynamically updated here
    } catch (error) {
        console.error("Failed to fetch and update home page:", error);
        app.innerHTML = `<p>Error loading content...</p>`; // Fallback content
    }
};

// Example constructor functions (you need to define these based on actual data structure)
// function constructMetaHTML(meta) {
//     const {title, description, keywords, url} = meta[0].attributes
//     const imageUrl = meta[0].attributes.image.data.attributes.url
//     return `
//         <!-- Meta Description -->
//         <meta name="description" content="Ei, maži ir dideli, LiuKaBu atvyksta į Jūsų miestą ir kviečia pasinerti į pasakišką pasaulį, kuriame susijungs muzika, animacija ir didžiulė dozė džiaugsmo! Štai kas Jūsų laukia: Magiškas koncertas, teatralizuotas pasaulis ir žavūs jo personažai, koncertas nepaliks abejingų ir patiks ne tik vaikams, bet ir jų tėveliams bei seneliams.">

//         <!-- Meta Keywords -->
//         <meta name="keywords" content="LiuKaBu, laisvalaikis, muzika,zaidimai, žaidimai, zaidimai vaikams, žaidimai vaikams, animacijos, entertainment, music, animation, family, concert, magical, fun">

//         <!-- Open Graph Meta Tags for Social Sharing -->
//         <meta property="og:title" content="LiuKaBu - Magiškos linksmybės visai šeimai!">
//         <meta property="og:description" content="Ei, maži ir dideli, LiuKaBu atvyksta į Jūsų miestą ir kviečia pasinerti į pasakišką pasaulį, kuriame susijungs muzika, animacija ir didžiulė dozė džiaugsmo! Štai kas Jūsų laukia: Magiškas koncertas, teatralizuotas pasaulis ir žavūs jo personažai, koncertas nepaliks abejingų ir patiks ne tik vaikams, bet ir jų tėveliams bei seneliams.">
//         <meta property="og:image" content="https://liukabu-backend-production.up.railway.app/uploads/mobile_cover_fc2688f67d.png">
//         <meta property="og:url" content="hhttps://www.liukabu.lt">
//         <meta property="og:type" content="website">

//         <!-- Twitter Meta Tags for Social Sharing -->
//         <meta name="twitter:card" content="summary_large_image">
//         <meta name="twitter:title" content="LiuKaBu - Magiškos linksmybės visai šeimai!">
//         <meta name="twitter:description" content="Ei, maži ir dideli, LiuKaBu atvyksta į Jūsų miestą ir kviečia pasinerti į pasakišką pasaulį, kuriame susijungs muzika, animacija ir didžiulė dozė džiaugsmo! Štai kas Jūsų laukia: Magiškas koncertas, teatralizuotas pasaulis ir žavūs jo personažai, koncertas nepaliks abejingų ir patiks ne tik vaikams, bet ir jų tėveliams bei seneliams.">
//         <meta property="og:image" content="https://liukabu-backend-production.up.railway.app/uploads/mobile_cover_fc2688f67d.png">
//         <meta property="og:url" content="https://www.liukabu.lt">

//         <title>LiuKaBu - Magiškos linksmybės visai šeimai!</title>
//     `;
// }

function constructHeaderHTML(coverData) {
    // Construct and return HTML string for the header section based on coverData
    return `
        <header>
            <img class="cover" src="${apiUrl}${coverData.url}" alt="">
            <div class="scroll-down">
                <p>Slinkti žemyn</p>
                <div class="dot-1"></div>
                <div class="dot-2"></div>
                <div class="dot-3"></div>
          </div>
        </header>
    `;
}

function constructBannersHTML(banners) {
     // Dynamically generate banners HTML using fetched data
    const bannersHTML = banners.map((banner) => {
        const { href, button } = banner.attributes
        let imageUrl = banner.attributes.image.data[0].attributes.url;
        imageUrl = `${apiUrl}${imageUrl}`; // Adjust according to your data structure
  
        return `
            <a class="banner next-page-link" href="${href}">
                <img src="${imageUrl}" alt="${name}" loading="lazy">
                <button>${button}</button>
            </a>
        `;
    }).join('');

    return `
    <section class="banners">
        ${bannersHTML}
    </section>
    `;
}


function constructPitchHTML(pitchData) {
    // Use map to transform each item into a string, then join them into a single string
    const listItemsHTML = pitchData.list.map(item => `<li>${item.listItem}</li>`).join('');

    return `
        <section class="pitch">
            <p>${pitchData.paragraph}</p>
            <ul>
                ${listItemsHTML}
            </ul>
        </section>
    `;
}

function constructIframeHTML(youtubeUrl) {
    // Extract the video ID from the YouTube URL
    let videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    let videoId = "";
    let embedUrl = "";
    let thumbnailSrc = "path/to/default/thumbnail.jpg"; // Default thumbnail

    if (videoIdMatch && videoIdMatch[1]) {
        videoId = videoIdMatch[1];
        // Construct the embed URL and thumbnail URL using the extracted video ID
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
        thumbnailSrc = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }

    // Return the HTML with the embed URL and thumbnail. If no valid ID was found, the default thumbnail is used.
    return `
        <section class="iframe-section" data-iframe-url="${embedUrl}" data-thumbnail-src="${thumbnailSrc}">
            <img class="iframe-thumbnail" src="${thumbnailSrc}" />
            <iframe class="iframe" src="${embedUrl}" allowfullscreen loading="lazy"></iframe>
            <div class="iframe-overlay"></div>
            <div class="iframe-play-icon"></div>
        </section>
    `;
}


function constructGalleryHTML(images) {
    const galleryHTML = images.data.map(image => {
        const { name, url } = image.attributes;
        const imageUrl = `${apiUrl}${url}`;
        
        return `
            <div class="swiper-slide">
                <img src="${imageUrl}" alt="${name}" loading="lazy">
            </div>
        `;
    }).join('');

    return `
    <div class="swiper">
        <div class="swiper-wrapper">
            ${galleryHTML}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    `;
}

function constructFormHTML(formData) {
    const {emailParagraph, emailInput, emailButton} = formData
    return `
        <section class="form-section">
            <p>${emailParagraph}</p>
            
            <form id="myForm" action="#">
                <input id="email" type="email" placeholder="${emailInput}" autocomplete="off" required>
                <input type="submit" value="${emailButton}">
                <p id="successMessage">&nbsp;</p>
            </form>
        </section>
    `;
}

function constructFooterHTML(socialLinks) {
    const {facebookLink, instagramLink, youtubeLink} = socialLinks
    return `
    <footer>
    <div class="social">
        <a href="${instagramLink}" class="icon next-page-link">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path fill="#d3dbbb" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
        </svg>
      </a>
        <a href="${youtubeLink}" class="icon next-page-link">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
            <path fill="#d3dbbb" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
        </svg>
      </a>
    
        <a href="${facebookLink}" class="icon next-page-link">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
            <path fill="#d3dbbb" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
        </svg>
      </a>
    </div>
    <div class="flaming"></div>
    <div class="grass"></div>
    </footer>
    `;
}

async function loadScripts() {
    await import('./animations.js');
    await import('./gallery.js');
    await import('./mail.js');
}

document.addEventListener("DOMContentLoaded", async function() {
    await fetchAndUpdateHomePage();
    loadScripts().catch(error => console.error("Failed to load modules:", error));
});