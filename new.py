# myString= "hello"
# myList= []
# for letter in myString:
#     myList.append(letter)  
# print(myList)

# # using list comprehension
# myList2= [letter for letter in myString]
# print(myList2)

# # map filter reduce
# def square(num):
#     return num**2
# myNums= [1,2,3,4,5]

# # using map
# squared= map(square, myNums)
# for item in squared:
#     print(item)

# print(list(map(square, myNums)))

# def splicer(myString):
#     if len(myString) % 2 == 0:
#         return 'EVEN'
#     else:
#         return myString[0]
# name= ['Andy', 'Eve', 'Sally']
# print(list(map(splicer, name)))

# def check_even(nums):
#     return nums % 2 == 0

# nums= [1, 2, 3, 4, 5, 6, 7]
# print(list(filter(check_even, nums)))

# # without lambda
# def square(num):
#     return num**2
# print(square(5))
# # lambda
# num= 5
# print(lambda num: num**2)

# nums= [1,2,3,4,5,6,7,8,9]
# print(list(filter(lambda num: num % 2 == 0, nums)))

print(sum([1,2,3]))