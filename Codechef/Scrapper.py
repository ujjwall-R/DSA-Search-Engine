import time
import os
from selenium import webdriver
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome(ChromeDriverManager().install())

problemTag = input("Enter problem tag: ")
driver.get(f'https://www.codechef.com/tags/problems/{problemTag}')

time.sleep(5)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
all_ques_div = soup.findAll("div", {"class": "problem-tagbox-inner"})

all_ques = []

for ques in all_ques_div:
    all_ques.append(ques.findAll("div")[0].find("a"))

urls = []
titles = []

if len(all_ques) > 0:
    os.mkdir(f'{problemTag}')
    for ques in all_ques:
        urls.append("https://www.codechef.com"+ques['href'])
        titles.append(ques.text)

    with open(f'{problemTag}/problem_urls.txt', "w+") as f:
        f.write('\n'.join(urls))
    with open(f'{problemTag}/problem_titles.txt', "w+") as f:
        f.write('\n'.join(titles))
    print(f'Done! Check the {problemTag} folder to see the data sheet')
else:
    print("No such tags found!")
