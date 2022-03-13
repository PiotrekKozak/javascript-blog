{
    'use strict';

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);
        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);
        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-',
        optAuthorsListSelector = '.authors.list'

    function generateTitleLinks(customSelector = '') {

        /* [DONE] remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* [DONE] for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        let html = '';
        for (let article of articles) {
            /* [DONE] get the article id */
            const articleId = article.getAttribute('id');
            /* [DONE] find the title element */
            const articleTitleElement = article.querySelector(optTitleSelector);
            /* [DONE] get the title from the title element */
            const articleTitle = articleTitleElement.innerHTML;
            /* [DONE] create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            /* [DONE] insert link into titleList */
            html = html + linkHTML;
        }

        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }
    generateTitleLinks();

    function calculateTagsParams(tags) {
        const params = {
            max: 0,
            min: 99999
        };
        for (let tag in tags) {
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.max);
        }
        return params;
    }

    function calculateTagClass(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
        return optCloudClassPrefix + classNumber;
    }

    function generateTags() {
        /* [DONE] create a new variable allTags with an empty object */
        let allTags = {};
        /* [DONE] find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* [DONE] START LOOP: for every article: */
        for (let article of articles) {
            /* [DONE] find tags wrapper */
            const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
            /* [DONE] make html variable with empty string */
            let html = '';
            /* [DONE] get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            /* [DONE] split tags into array */
            const articleTagsArray = articleTags.split(' ');
            /* [DONE] START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                /* [DONE] generate HTML of the link */
                const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
                /* [DONE] add generated code to html variable */
                html = html + ' ' + tagHTML;
                /* [DONE] check if this link is NOT already in allTags */
                if (!allTags[tag]) {
                    /* [DONE] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }

                /* [DONE] END LOOP: for each tag */
            }
            /* [DONE] insert HTML of all the links into the tags wrapper */
            articleTagsWrapper.innerHTML = html;
            /* [DONE] END LOOP: for every article: */
        }
        /* [DONE] find list of tags in right column */
        const tagList = document.querySelector(optTagsListSelector);
        /* [DONE] create variable for all links HTML code */
        let allTagsHTML = '';
        const tagsParam = calculateTagsParams(allTags);
        console.log('tagsParam:', tagsParam)

        /* [DONE] START LOOP: for each tag in allTags: */
        for (let tag in allTags) {
            /* [DONE] generate code of a link and add it to allTagsHTML */
            const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParam) + '">' + tag + ' ' + '</a></li>';
            allTagsHTML += tagLinkHTML;

            /* [DONE] END LOOP: for each tag in allTags: */
        }

        /*[DONE] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;

    }
    generateTags();

    function tagClickHandler(event) {
        /* [DONE] prevent default action for this event */
        event.preventDefault();
        /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* [DONE] find all tag links with class active */
        const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
        /* [DONE] START LOOP: for each active tag link */
        for (let activeTag of activeTags) {
            /* [DONE] remove class active */
            activeTag.classList.remove('active');
            /* [DONE] END LOOP: for each active tag link */
        }
        /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href^="#tag-' + href + '"]');
        /* [DONE] START LOOP: for each found tag link */
        for (let tagLink of tagLinks) {
            /* [DONE] add class active */
            tagLink.classList.add('active');
            /* [DONE] END LOOP: for each found tag link */
        }
        /* [DONE] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags() {
        /* [DONE] find all links to tags */
        const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
        /* [DONE] START LOOP: for each link */
        for (let tagLink of tagLinks) {
            /* [DONE] add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
            /* [DONE] END LOOP: for each link */
        }
    }

    addClickListenersToTags();

    function generateAuthor() {
        /* [DONE] create a new variable allAuthors with an empty array */
        let allAuthors = {};
        /* [DONE]find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* [DONE] START LOOP: for every article: */
        for (let article of articles) {
            /* [DONE] make html variable with empty string */
            let html = '';
            /* [DONE] get author from data-author attribute */
            const articleAuthor = article.getAttribute('data-author');
            /* [DONE] generate HTML of the link */
            const authorHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
            /* [DONE] add generated code to html variable */
            html = html + ' ' + authorHTML;
            /* [DONE] check if this link is NOT already in allTags */
            if (!allAuthors[articleAuthor]) {
                /* [DONE] add tag to allTags object */
                allAuthors[articleAuthor] = 1;
            } else {
                allAuthors[articleAuthor]++;
            }
            /* [DONE] insert HTML of link into the author wrapper */
            const authorName = article.querySelector(optArticleAuthorSelector);
            authorName.innerHTML = html;
            /* [DONE] END LOOP: for every article: */
        }
        /* [DONE] find list of authors in right column */
        const authorsList = document.querySelector(optAuthorsListSelector);
        /* [DONE] create variable for all links HTML code */
        let allAuthorsHTML = '';
        /* [DONE] START LOOP: for each author in allAuthors: */
        for (let author in allAuthors) {
            /* [DONE] generate code of a link and add it to allAuthorsHTML */
            allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') </a></li>';
            /* [DONE] END LOOP: for each author in allTags: */
        }
        /*[DONE] add HTML from allAuthorsHTML to authorsList */
        authorsList.innerHTML = allAuthorsHTML;
    }
    generateAuthor();

    function authorClickHandler(event) {
        /* [DONE] prevent default action for this event */
        event.preventDefault();
        /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* [DONE] make a new constant "author" and extract author from the "href" constant */
        const author = href.replace('#author-', '');
        /* [DONE] find all author links with class active */
        const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
        /* [DONE] START LOOP: for each active author link */
        for (let activeAuthor of activeAuthors) {
            /* [DONE] remove class active */
            activeAuthor.classList.remove('active');
            /* [DONE] END LOOP: for each active author link */
        }
        /* [DONE] find all author links with "href" attribute equal to the "href" constant */
        const authorLinks = document.querySelectorAll('a[href^="#author-' + href + '"]');
        /* [DONE] START LOOP: for each found author link */
        for (let authorLink of authorLinks) {
            /* [DONE] add class active */
            authorLink.classList.add('active');
            /* [DONE] END LOOP: for each found author link */
        }
        /* [DONE] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenersToAuthors() {
        /* [DONE] find all links to authors */
        const authorLinks = document.querySelectorAll('a[href^="#author-"]');
        /* [DONE] START LOOP: for each link */
        for (let authorLink of authorLinks) {
            /* [DONE] add authorClickHandler as event listener for that link */
            authorLink.addEventListener('click', authorClickHandler);
            /* [DONE] END LOOP: for each link */
        }
    }

    addClickListenersToAuthors();

}