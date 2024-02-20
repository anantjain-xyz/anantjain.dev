import os, os.path, re
from shutil import move

path = "./_posts"
posts = os.listdir(path)

for p in posts:
    input_file = os.path.join(path, p, "index.md")
    output_file = os.path.join(path, p, "index_regex.md")

    with open(input_file, "r") as fi, open(output_file, "w") as fo:
        for line in fi:
            line = re.compile(r"]\(\.").sub("](/assets/blog/" + p, line)
            fo.write(line)

    move(output_file, input_file)
