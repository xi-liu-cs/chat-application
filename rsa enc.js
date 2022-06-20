/* kth step: find a quotient q_k, remainder r_k
r_{k - 2} = q_k * r_{k - 1} + r_k, r_k = r_{k - 2} % r_{k - 1} 
base step: k = 0, r_{k - 2} = r_{-2} = a, r_{k - 1} = r_{-1} = b 
gcd(a = 1071, b = 462)
step k:     equation                                            quotient, remainder
0           r_{-2} = 1071 = q_0 * (r_{-1} = 462) + r_0          q_0 = 2, r_0 = 147
1           r_{-1} = 462 = q_1 * (r_0 = 147) + r_1              q_1 = 3, r_1 = 21           
2           r_0 = 147 = q_2 * (r_1 = 21) + r_2                  q_2 = 7, r_2 = 0 */
   
function euclid_gcd(a, b)
{
    while(b)
    {
        t = b;
        b = a % b; /* r_k = r_{k - 2} % r_{k - 1} */
        a = t; 
    }
    return a > -a ? a : -a;
}

p = 1013;
q = 1019;
n = p * q;
console.log(`n: ${n}`);
e = 2;
/* phi(i): number of integers less than i that do not share a common factor with i
since prime numbers have no factors greater than 1, so the i - 1 positive integers
do not share a common factor with i
if(is_prime(i))
	phi(i) = i - 1

phi(pq) = phi(p) * phi(q) = (p - 1) * (q - 1)
p, q are prime factors of pq, integer k is coprime to pq iff it is not a
multiple of p or q. in 0 < k < pq, there are p - 1 multiples of q
q - 1 multiples of p, so (p - 1) + (q - 1) integers share a factor with pq
phi(pq) = (#integers < pq) - (#integers not coprime)
	= (pq - 1) - ((p - 1) + (q - 1))
	= pq - 1 - p - q + 2
	= pq - p - q + 1
	= (p - 1)(q - 1) */
phi = (p - 1) * (q - 1);

/* choose encrypt e:
1 < e < phi(n)
coprime with n, phi(n) */
while(e < phi)
{
	if(euclid_gcd(e, phi) == 1)
		break;
	else
		++e;
}
console.log(`e: ${e}`);

/* choose decrypt d:
de = 1  mod phi(n) 

m ^ e = c  mod n
c ^ d = m  mod n
(m ^ e) ^ d = m  mod n
m ^ {ed} = m  mod n

euler's theorem
m ^ {phi(n)} = 1  mod n
1 ^ i = 1
m ^ {i * phi(n)} = 1  mod n
m * m ^ {i * phi(n)} = m  mod n
m ^ {i * phi(n) + 1} = m  mod n

since m ^ {ed} = m  mod n
ed = i * phi(n) + 1
d = (i * phi(n) + 1) / e
easy to calcuate d iff factorization of n is known */
i = 2;
d = Math.floor((i * phi + 1) / e);
msg = 12;
console.log(`d: ${d}`);
console.log(`msg: ${msg}`);

/* encryption: c = (msg ^ e) % n */
c = BigInt(msg ** e % n);
console.log(`ciphertext: ${c}`);

/* decryption: m = (c ^ d) % n */
d = BigInt(Math.trunc(d));
n = BigInt(n);
m = BigInt(c ** d % n);
console.log(`original msg: ${m}`);
