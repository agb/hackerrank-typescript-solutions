# Unfortunately, this is not a typescript solution because Typescript (and Javascript also) has a debugger problem. 
# PYTHON_3 SOLUTION
def findZigZagSequence(a, n):
    a.sort()
    mid = int(n/2) # here (odd array)
    a[mid], a[n-1] = a[n-1], a[mid]

    st = mid + 1
    ed = n - 2 # here (already replaced above)
    while(st <= ed):
        a[st], a[ed] = a[ed], a[st]
        st = st + 1
        ed = ed - 1 # here (change elements between mid - end)

    for i in range (n):
        if i == n-1:
            print(a[i])
        else:
            print(a[i], end = ' ')
    return

test_cases = int(input())
for cs in range (test_cases):
    n = int(input())
    a = list(map(int, input().split()))
    findZigZagSequence(a, n)



