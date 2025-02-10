# AULA 10/02/2025
# python3 10-02-2025.py

# Questão 1.1)
# def bird__pad(str):
#     sound = "bird"
#     return sound + str + sound

# print(bird__pad("som"))


# A conjectura de Collatz
def collatz(x):
    while x > 1:
        if x % 2 == 0:
            x = x // 2
        else:
            x = 3 * x + 1
    print(x)

collatz(2)